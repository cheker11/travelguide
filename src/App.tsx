/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Bookmark, 
  Share2, 
  Printer, 
  Check, 
  RotateCcw, 
  Calendar,
  Layers,
  Heart,
  Github,
  Globe2
} from 'lucide-react';

import { 
  DayItinerary, 
  ItineraryRequest, 
  Language, 
  SavedTrip,
  MoodType
} from './types/itinerary';
import { translations } from './i18n/translations';
import { 
  generateItinerary, 
  getStoredApiKey, 
  swapStopAlternative 
} from './services/geminiService';
import { generateCuratedItinerary, CITIES_DATABASE } from './services/curatedData';

import { Header } from './components/Header';
import { RouteForm } from './components/RouteForm';
import { RouteMap } from './components/RouteMap';
import { TimelineView } from './components/TimelineView';
import { BudgetSummary } from './components/BudgetSummary';
import { ProTipsCard } from './components/ProTipsCard';
import { ExportModal } from './components/ExportModal';
import { SavedRoutesDrawer } from './components/SavedRoutesDrawer';
import { ApiKeyModal } from './components/ApiKeyModal';

const SAVED_STORAGE_KEY = 'dayroute_saved_trips_v1';
const LANG_STORAGE_KEY = 'dayroute_user_lang_v1';

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'uk' || saved === 'en') return saved;
    } catch (e) {}
    return 'uk';
  });

  const t = translations[language];

  const [itinerary, setItinerary] = useState<DayItinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [swappingStopId, setSwappingStopId] = useState<string | null>(null);
  const [lastRequest, setLastRequest] = useState<ItineraryRequest | null>(null);

  // Modals & Drawers
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);

  // Saved Trips
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>(() => {
    try {
      const data = localStorage.getItem(SAVED_STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {}
    return [];
  });

  const [hasApiKey, setHasApiKey] = useState(() => !!getStoredApiKey());

  // Save language
  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (e) {}

    // Regenerate current itinerary in the new language if one exists
    if (lastRequest) {
      const updatedReq = { ...lastRequest, language: newLang };
      setLastRequest(updatedReq);
      handleGenerate(updatedReq);
    }
  };

  // Initial load: generate an instant sample itinerary for Kyiv or Rome
  useEffect(() => {
    const initialCity = language === 'uk' ? 'Київ' : 'Rome';
    const initialReq: ItineraryRequest = {
      city: initialCity,
      budgetType: 'moderate',
      currency: language === 'uk' ? 'UAH' : 'EUR',
      mood: 'foodie',
      pace: 'balanced',
      companion: 'couple',
      startTime: '09:00',
      endTime: '22:30',
      language,
    };
    setLastRequest(initialReq);
    const initialItinerary = generateCuratedItinerary(initialReq);
    setItinerary(initialItinerary);
  }, []);

  // Generate itinerary
  const handleGenerate = async (request: ItineraryRequest) => {
    setIsLoading(true);
    setLastRequest(request);
    setSelectedStopId(null);

    try {
      const { itinerary: result } = await generateItinerary(request);
      setItinerary(result);
    } catch (err) {
      console.error('Generation error', err);
      // Fallback guarantee
      const fallback = generateCuratedItinerary(request);
      setItinerary(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle visited checkbox on stop
  const handleToggleVisited = (stopId: string) => {
    if (!itinerary) return;
    const updatedStops = itinerary.stops.map(s => {
      if (s.id === stopId) {
        return { ...s, visited: !s.visited };
      }
      return s;
    });
    setItinerary({ ...itinerary, stops: updatedStops });
  };

  // Swap stop alternative
  const handleSwapStop = async (stopId: string) => {
    if (!itinerary) return;
    setSwappingStopId(stopId);
    try {
      const updated = await swapStopAlternative(itinerary, stopId, language);
      setItinerary(updated);
    } finally {
      setSwappingStopId(null);
    }
  };

  // Surprise Me Randomizer
  const handleSurpriseMe = () => {
    const citiesUk = ['Київ', 'Львів', 'Одеса', 'Рим', 'Париж', 'Барселона', 'Токіо'];
    const citiesEn = ['Rome', 'Paris', 'Barcelona', 'Kyiv', 'Tokyo', 'Lviv'];
    const pool = language === 'uk' ? citiesUk : citiesEn;
    const randomCity = pool[Math.floor(Math.random() * pool.length)];

    const moods: MoodType[] = ['foodie', 'cultural', 'hidden_gems', 'romantic', 'adventure', 'relaxed'];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const currency = (randomCity === 'Київ' || randomCity === 'Львів' || randomCity === 'Одеса') ? 'UAH' : 'EUR';

    const req: ItineraryRequest = {
      city: randomCity,
      budgetType: 'moderate',
      currency,
      mood: randomMood,
      pace: 'balanced',
      companion: 'couple',
      startTime: '09:30',
      endTime: '22:00',
      language,
    };

    handleGenerate(req);
  };

  // Save Trip
  const handleSaveTrip = () => {
    if (!itinerary) return;
    const newTrip: SavedTrip = {
      id: `saved-${Date.now()}`,
      itinerary,
      savedAt: Date.now(),
    };
    const updated = [newTrip, ...savedTrips.filter(t => t.itinerary.id !== itinerary.id)];
    setSavedTrips(updated);
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}

    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 2500);
  };

  // Delete Trip
  const handleDeleteTrip = (tripId: string) => {
    const updated = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updated);
    try {
      localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  // Select Trip from Drawer
  const handleSelectTrip = (trip: SavedTrip) => {
    setItinerary(trip.itinerary);
  };

  const isCurrentTripSaved = itinerary && savedTrips.some(t => t.itinerary.id === itinerary.id);

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans">
      {/* Header */}
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        savedCount={savedTrips.length}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenSettings={() => setIsApiKeyModalOpen(true)}
        onSurpriseMe={handleSurpriseMe}
        isAiEnabled={hasApiKey}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Hero Banner */}
        <section className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.heroBadge}</span>
            <span className="text-stone-300">•</span>
            <span className="text-stone-600 font-medium">{t.readyForGithub}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-stone-950 tracking-tight font-serif mb-3">
            {t.appSubtitle}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {t.tagline}
          </p>
        </section>

        {/* Route Form Builder */}
        <section className="max-w-4xl mx-auto mb-12 no-print">
          <RouteForm
            language={language}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            initialRequest={lastRequest || undefined}
          />
        </section>

        {/* Generated Itinerary Section */}
        {itinerary && (
          <section className="space-y-8 animate-fadeIn">
            {/* Itinerary Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 border border-stone-200/80">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-amber-300 text-xs font-bold">
                      <MapPin className="w-3.5 h-3.5" />
                      {itinerary.city}{itinerary.country ? `, ${itinerary.country}` : ''}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900">
                      {t.moodOptions[itinerary.mood]?.icon} {t.moodOptions[itinerary.mood]?.title}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                      {t.budgetOptions[itinerary.budgetType]?.title}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    {itinerary.tagline}
                  </h2>
                  <p className="text-sm text-stone-600 mt-2 max-w-3xl leading-relaxed">
                    {itinerary.vibeDescription}
                  </p>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap no-print">
                  {/* Save Route Button */}
                  <button
                    onClick={handleSaveTrip}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-xs ${
                      isCurrentTripSaved
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isCurrentTripSaved ? 'fill-emerald-600 text-emerald-600' : 'text-stone-500'}`} />
                    <span>{isCurrentTripSaved ? t.saved : t.saveTrip}</span>
                  </button>

                  {/* Export / Share Modal Button */}
                  <button
                    onClick={() => setIsExportModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-stone-950 transition-all cursor-pointer shadow-sm shadow-amber-500/20"
                  >
                    <Share2 className="w-4 h-4 text-stone-950" />
                    <span>{t.export}</span>
                  </button>

                  {/* Regenerate Button */}
                  {lastRequest && (
                    <button
                      onClick={() => handleGenerate(lastRequest)}
                      disabled={isLoading}
                      className="p-2.5 rounded-xl text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                      title={t.regenerate}
                    >
                      <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Two-Column Grid: Timeline & Interactive Map + Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Timeline Stops */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-lg text-stone-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-amber-500" />
                    <span>{t.timelineTitle}</span>
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">
                    {itinerary.stops.length} {language === 'uk' ? 'локацій' : 'destinations'}
                  </span>
                </div>

                <TimelineView
                  itinerary={itinerary}
                  language={language}
                  selectedStopId={selectedStopId}
                  onSelectStop={(id) => setSelectedStopId(id)}
                  onToggleVisited={handleToggleVisited}
                  onSwapStop={handleSwapStop}
                  swappingStopId={swappingStopId}
                />
              </div>

              {/* Right Column: Interactive Map & Financial Breakdown */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* Map */}
                <div>
                  <h3 className="font-extrabold text-sm text-stone-900 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>{t.mapTitle}</span>
                  </h3>
                  <RouteMap
                    itinerary={itinerary}
                    selectedStopId={selectedStopId}
                    onSelectStop={(id) => setSelectedStopId(id)}
                    language={language}
                  />
                </div>

                {/* Budget Summary Card */}
                <BudgetSummary
                  breakdown={itinerary.budgetBreakdown}
                  budgetType={itinerary.budgetType}
                  customBudgetAmount={lastRequest?.customBudgetAmount}
                  language={language}
                />

                {/* Pro Tips & Local Secrets Card */}
                <ProTipsCard
                  itinerary={itinerary}
                  language={language}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-stone-900 border-t border-stone-800 text-stone-400 py-10 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-white font-serif text-sm">DayRoute</span>
            <span>&bull;</span>
            <span>{t.appSubtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span>{language === 'uk' ? 'Українська та English' : 'Ukrainian & English'}</span>
            <span>&bull;</span>
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              GitHub / API
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {itinerary && isExportModalOpen && (
        <ExportModal
          itinerary={itinerary}
          language={language}
          onClose={() => setIsExportModalOpen(false)}
        />
      )}

      <SavedRoutesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedTrips={savedTrips}
        onSelectTrip={handleSelectTrip}
        onDeleteTrip={handleDeleteTrip}
        language={language}
      />

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        language={language}
        onApiKeyUpdated={() => setHasApiKey(!!getStoredApiKey())}
      />

      {/* Save Toast Notification */}
      {saveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-stone-700 animate-fadeIn text-xs font-bold">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{t.saved}!</span>
        </div>
      )}
    </div>
  );
}
