import { GoogleGenAI } from '@google/genai';
import { DayItinerary, ItineraryRequest, ItineraryStop } from '../types/itinerary';
import { generateCuratedItinerary } from './curatedData';

const CUSTOM_API_KEY_STORAGE = 'dayroute_custom_gemini_api_key';

export function getStoredApiKey(): string {
  try {
    const local = localStorage.getItem(CUSTOM_API_KEY_STORAGE);
    if (local && local.trim().length > 0) return local.trim();
  } catch (e) {
    // LocalStorage might be disabled in private mode
  }
  return (
    (import.meta as any).env?.VITE_GEMINI_API_KEY ||
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    ''
  );
}

export function saveStoredApiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(CUSTOM_API_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(CUSTOM_API_KEY_STORAGE);
    }
  } catch (e) {
    console.error('Failed to save API key to localStorage', e);
  }
}

export function removeStoredApiKey(): void {
  try {
    localStorage.removeItem(CUSTOM_API_KEY_STORAGE);
  } catch (e) {
    console.error('Failed to remove API key', e);
  }
}

/**
 * Generate full day itinerary either using Gemini 2.5 Flash
 * or fallback to curated synthesis engine if no key / network failure.
 */
export async function generateItinerary(
  request: ItineraryRequest,
  onStatusUpdate?: (status: string) => void
): Promise<{ itinerary: DayItinerary; isAiGenerated: boolean; usedFallback: boolean }> {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    // Direct curated generation for GitHub Pages out-of-the-box experience
    onStatusUpdate?.('offline_curated');
    const itinerary = generateCuratedItinerary(request);
    return { itinerary, isAiGenerated: false, usedFallback: false };
  }

  try {
    onStatusUpdate?.('ai_generating');
    const ai = new GoogleGenAI({ apiKey });

    const isUk = request.language === 'uk';
    const langInstructions = isUk 
      ? 'ВІДПОВІДАЙ ВИКЛЮЧНО УКРАЇНСЬКОЮ МОВОЮ. Всі назви зупинок, описи, лайфхаки та поради мають бути вишуканою, живою українською мовою!'
      : 'RESPOND STRICTLY IN ENGLISH. All stop names, descriptions, lifehacks and recommendations must be in clear, engaging English!';

    const prompt = `You are an elite local travel curator and insider expert. Create a complete, impeccably detailed 1-day itinerary for an unfamiliar traveler.
City: ${request.city}
Language: ${request.language}
Budget tier: ${request.budgetType} ${request.customBudgetAmount ? `(Target amount: ${request.customBudgetAmount} ${request.currency})` : `(Preferred currency: ${request.currency})`}
Mood / Theme: ${request.mood}
Pace: ${request.pace} (relaxed: 4 stops, balanced: 5-6 stops, intense: 7-8 stops)
Traveling with: ${request.companion}
Active hours: from ${request.startTime} to ${request.endTime}

${langInstructions}

You must return valid JSON matching this exact structure:
{
  "city": "${request.city}",
  "country": "Country name",
  "tagline": "Inspiring and catchy 1-sentence tagline for this exact day",
  "vibeDescription": "Rich 2-sentence overview explaining why this route matches the budget and mood",
  "stops": [
    {
      "id": "stop-1",
      "time": "09:00 - 10:15",
      "name": "Exact Name of Cafe / Landmark / Park / Viewpoint",
      "category": "coffee" | "sight" | "museum" | "lunch" | "park" | "viewpoint" | "dinner" | "nightlife" | "hidden_spot",
      "description": "2-3 engaging sentences on what to see, feel, and enjoy here",
      "insiderTip": "A genuine local secret tip, lifehack, hidden detail, or table recommendation",
      "estimatedCost": 5, // number in ${request.currency}
      "durationMinutes": 45,
      "coordinates": { "lat": 0.0, "lng": 0.0 }, // realistic latitude and longitude for this spot in ${request.city}
      "address": "Street address or district",
      "transitToNext": {
        "mode": "walk" | "transit" | "taxi",
        "durationMinutes": 15,
        "distanceMeters": 750,
        "description": "Short scenic walking/transit directions to next stop"
      }
    }
  ],
  "budgetBreakdown": {
    "foodAndDrinks": 25,
    "activitiesAndTickets": 15,
    "transport": 6,
    "snacksAndSouvenirs": 8,
    "emergencyBuffer": 5,
    "totalEstimated": 59,
    "currency": "${request.currency}"
  },
  "localProTips": [
    "Tip 1: Practical advice on local transport, cards, or customs",
    "Tip 2: Insider rule for avoiding crowds or tourist traps",
    "Tip 3: Essential city lifehack"
  ],
  "recommendedFoods": [
    "Signature regional food 1",
    "Signature regional drink/pastry 2",
    "Authentic specialty 3"
  ],
  "bestPhotoSpots": [
    "Best photo spot 1 with best angle",
    "Best photo spot 2 at golden hour"
  ],
  "idealWeatherAdvice": "Concise clothing and comfort tip for exploring this city by foot"
}
Make coordinates realistic so they can plot on an OpenStreetMap without floating in the ocean.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanedText);

    // Validate and fill missing fields
    const stops: ItineraryStop[] = (parsed.stops || []).map((s: any, idx: number) => ({
      id: s.id || `stop-${idx + 1}-${Date.now()}`,
      time: s.time || `${9 + idx * 2}:00 - ${10 + idx * 2}:30`,
      name: s.name || `Spot ${idx + 1}`,
      category: s.category || 'sight',
      description: s.description || '',
      insiderTip: s.insiderTip || '',
      estimatedCost: Number(s.estimatedCost) || 0,
      durationMinutes: Number(s.durationMinutes) || 45,
      coordinates: {
        lat: Number(s.coordinates?.lat) || 0,
        lng: Number(s.coordinates?.lng) || 0,
      },
      address: s.address || '',
      googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name || ''}, ${request.city}`)}`,
      transitToNext: s.transitToNext ? {
        mode: s.transitToNext.mode || 'walk',
        durationMinutes: Number(s.transitToNext.durationMinutes) || 15,
        distanceMeters: Number(s.transitToNext.distanceMeters) || 600,
        description: s.transitToNext.description || 'Walk to next stop',
      } : undefined,
      visited: false,
    }));

    const resultItinerary: DayItinerary = {
      id: `ai-trip-${Date.now()}`,
      city: parsed.city || request.city,
      country: parsed.country || '',
      tagline: parsed.tagline || `${request.city} in 1 Day`,
      vibeDescription: parsed.vibeDescription || '',
      mood: request.mood,
      budgetType: request.budgetType,
      pace: request.pace,
      companion: request.companion,
      stops,
      budgetBreakdown: {
        foodAndDrinks: Number(parsed.budgetBreakdown?.foodAndDrinks) || 0,
        activitiesAndTickets: Number(parsed.budgetBreakdown?.activitiesAndTickets) || 0,
        transport: Number(parsed.budgetBreakdown?.transport) || 0,
        snacksAndSouvenirs: Number(parsed.budgetBreakdown?.snacksAndSouvenirs) || 0,
        emergencyBuffer: Number(parsed.budgetBreakdown?.emergencyBuffer) || 0,
        totalEstimated: Number(parsed.budgetBreakdown?.totalEstimated) || 0,
        currency: request.currency,
      },
      localProTips: Array.isArray(parsed.localProTips) ? parsed.localProTips : [],
      recommendedFoods: Array.isArray(parsed.recommendedFoods) ? parsed.recommendedFoods : [],
      bestPhotoSpots: Array.isArray(parsed.bestPhotoSpots) ? parsed.bestPhotoSpots : [],
      idealWeatherAdvice: parsed.idealWeatherAdvice || '',
      createdAt: Date.now(),
      language: request.language,
    };

    return { itinerary: resultItinerary, isAiGenerated: true, usedFallback: false };
  } catch (error) {
    console.warn('Gemini AI generation failed, falling back to curated engine:', error);
    // Smooth, graceful fallback to curated engine
    const fallbackItinerary = generateCuratedItinerary(request);
    return { itinerary: fallbackItinerary, isAiGenerated: false, usedFallback: true };
  }
}

/**
 * Regenerate or swap an individual stop
 */
export async function swapStopAlternative(
  currentItinerary: DayItinerary,
  stopIdToSwap: string,
  language: 'uk' | 'en'
): Promise<DayItinerary> {
  const isUk = language === 'uk';
  const targetStopIndex = currentItinerary.stops.findIndex(s => s.id === stopIdToSwap);
  if (targetStopIndex === -1) return currentItinerary;

  const oldStop = currentItinerary.stops[targetStopIndex];

  // Pick alternative
  const alternativesUk: Array<{ name: string; category: ItineraryStop['category']; tip: string; desc: string }> = [
    {
      name: 'Секретний внутрішній дворик та винний бар',
      category: 'hidden_spot',
      desc: 'Затишний кам\'яний двір, увитий плющем, де грає тихий джаз і подають натуральні вина.',
      tip: 'Замовте дегустаційний сет із трьох локальних вин та маслин.',
    },
    {
      name: 'Панорамний дах або вежа з видом на старовину',
      category: 'viewpoint',
      desc: 'Захопливий краєвид на черепичні дахи та міські вежі у м\'якому світлі.',
      tip: 'Підніміться сходами замість ліфта, щоб роздивитися старовинні гвинтові сходи.',
    },
    {
      name: 'Вінтажна книгарня-кав\'ярня з раритетами',
      category: 'coffee',
      desc: 'Полиці зі старими картами, книгами та ароматом свіжозвареної арабіки.',
      tip: 'Тут можна знайти унікальні листівки минулого століття.',
    },
    {
      name: 'Сучасна незалежна арт-галерея',
      category: 'museum',
      desc: 'Камерний виставковий простір із роботами прогресивних молодих митців.',
      tip: 'Вхід часто вільний або за добровільний донат.',
    }
  ];

  const alternativesEn: Array<{ name: string; category: ItineraryStop['category']; tip: string; desc: string }> = [
    {
      name: 'Secret Ivy Courtyard & Natural Wine Bar',
      category: 'hidden_spot',
      desc: 'Quiet cobblestone oasis draped in wisteria with ambient jazz and local vintage bottles.',
      tip: 'Ask for the sommelier\'s favorite natural pet-nat sparkling wine.',
    },
    {
      name: 'Panoramic Rooftop Belltower Lookout',
      category: 'viewpoint',
      desc: 'Breathtaking lookout point over red-tile roofs, clocktowers, and city horizon.',
      tip: 'Great windbreak glass balustrades make it pleasant in any breeze.',
    },
    {
      name: 'Indie Literary Cafe & Vintage Prints',
      category: 'coffee',
      desc: 'Floor-to-ceiling wooden bookshelves, artisan filter coffee, and quiet reading nooks.',
      tip: 'Look through the vintage postcard bin for authentic century-old city stamps.',
    },
    {
      name: 'Contemporary Underground Art Space',
      category: 'museum',
      desc: 'Intimate vault gallery hosting curated modern sculptures and installations.',
      tip: 'Entry is often pay-what-you-wish and includes an exhibition pamphlet.',
    }
  ];

  const pool = isUk ? alternativesUk : alternativesEn;
  const picked = pool[Math.floor(Math.random() * pool.length)];

  const updatedStop: ItineraryStop = {
    ...oldStop,
    id: `swapped-${Date.now()}`,
    name: picked.name,
    category: picked.category,
    description: picked.desc,
    insiderTip: picked.tip,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${picked.name}, ${currentItinerary.city}`)}`,
  };

  const updatedStops = [...currentItinerary.stops];
  updatedStops[targetStopIndex] = updatedStop;

  return {
    ...currentItinerary,
    stops: updatedStops,
  };
}
