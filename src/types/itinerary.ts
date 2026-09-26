export type Language = 'uk' | 'en';

export type BudgetType = 'budget' | 'moderate' | 'luxury' | 'custom';
export type PaceType = 'relaxed' | 'balanced' | 'intense';
export type CompanionType = 'solo' | 'couple' | 'friends' | 'family';

export type MoodType = 
  | 'cultural'
  | 'foodie'
  | 'romantic'
  | 'hidden_gems'
  | 'adventure'
  | 'relaxed';

export interface ItineraryRequest {
  city: string;
  budgetType: BudgetType;
  customBudgetAmount?: number;
  currency: string;
  mood: MoodType;
  pace: PaceType;
  companion: CompanionType;
  startTime: string; // e.g. "09:00"
  endTime: string;   // e.g. "22:00"
  specialPreferences?: string[];
  language: Language;
}

export interface StopCoordinates {
  lat: number;
  lng: number;
}

export interface ItineraryStop {
  id: string;
  time: string;           // "09:00 - 10:15"
  name: string;           // "Кав'ярня 'Світ Кави'"
  category: 'coffee' | 'breakfast' | 'sight' | 'museum' | 'lunch' | 'park' | 'viewpoint' | 'dinner' | 'nightlife' | 'shopping' | 'hidden_spot';
  description: string;    // Story / description
  insiderTip: string;     // Secret tip / lifehack
  estimatedCost: number;  // In chosen currency
  durationMinutes: number;
  coordinates: StopCoordinates;
  address?: string;
  googleMapsUrl: string;
  transitToNext?: {
    mode: 'walk' | 'transit' | 'taxi';
    durationMinutes: number;
    distanceMeters?: number;
    description: string;
  };
  visited?: boolean;
}

export interface BudgetBreakdown {
  foodAndDrinks: number;
  activitiesAndTickets: number;
  transport: number;
  snacksAndSouvenirs: number;
  emergencyBuffer: number;
  totalEstimated: number;
  currency: string;
}

export interface DayItinerary {
  id: string;
  city: string;
  country?: string;
  tagline: string;
  vibeDescription: string;
  mood: MoodType;
  budgetType: BudgetType;
  pace: PaceType;
  companion: CompanionType;
  stops: ItineraryStop[];
  budgetBreakdown: BudgetBreakdown;
  localProTips: string[];
  recommendedFoods: string[];
  bestPhotoSpots: string[];
  idealWeatherAdvice: string;
  createdAt: number;
  language: Language;
}

export interface SavedTrip {
  id: string;
  itinerary: DayItinerary;
  savedAt: number;
  customNotes?: string;
}
