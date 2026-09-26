import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  Sparkles, 
  Footprints, 
  Car, 
  Train,
  Lightbulb,
  DollarSign
} from 'lucide-react';
import { DayItinerary, ItineraryStop, Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface TimelineViewProps {
  itinerary: DayItinerary;
  language: Language;
  selectedStopId?: string | null;
  onSelectStop: (stopId: string) => void;
  onToggleVisited: (stopId: string) => void;
  onSwapStop: (stopId: string) => void;
  swappingStopId?: string | null;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  itinerary,
  language,
  selectedStopId,
  onSelectStop,
  onToggleVisited,
  onSwapStop,
  swappingStopId,
}) => {
  const t = translations[language];

  const handleToggle = (stopId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleVisited(stopId);

    // Check if this was the last unvisited stop
    const stop = itinerary.stops.find(s => s.id === stopId);
    if (stop && !stop.visited) {
      const remainingUnvisited = itinerary.stops.filter(s => s.id !== stopId && !s.visited);
      if (remainingUnvisited.length === 0) {
        // All stops completed! Fire celebratory confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'coffee':
      case 'breakfast':
        return '☕';
      case 'museum':
        return '🏛️';
      case 'lunch':
        return '🍝';
      case 'park':
        return '🌳';
      case 'viewpoint':
        return '🌅';
      case 'dinner':
        return '🍷';
      case 'nightlife':
        return '🍸';
      case 'hidden_spot':
        return '🗝️';
      default:
        return '📍';
    }
  };

  const getTransitIcon = (mode?: string) => {
    switch (mode) {
      case 'transit':
        return <Train className="w-4 h-4 text-stone-500" />;
      case 'taxi':
        return <Car className="w-4 h-4 text-stone-500" />;
      default:
        return <Footprints className="w-4 h-4 text-stone-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {itinerary.stops.map((stop, index) => {
        const isSelected = selectedStopId === stop.id;
        const isVisited = !!stop.visited;
        const isSwapping = swappingStopId === stop.id;

        return (
          <div key={stop.id} className="relative">
            {/* Main Stop Card */}
            <div
              onClick={() => onSelectStop(stop.id)}
              className={`p-5 sm:p-6 rounded-3xl border-2 transition-all cursor-pointer bg-white relative overflow-hidden group ${
                isSelected
                  ? 'border-amber-500 shadow-xl shadow-amber-500/10 ring-4 ring-amber-500/10'
                  : 'border-stone-200/90 hover:border-stone-300 shadow-md shadow-stone-100'
              } ${isVisited ? 'bg-stone-50/70 border-emerald-300/80' : ''}`}
            >
              {/* Header inside card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {/* Step number badge */}
                  <span
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-sm shadow-sm transition-transform group-hover:scale-105 ${
                      isVisited
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-100'
                    }`}
                  >
                    {isVisited ? '✓' : index + 1}
                  </span>

                  <div>
                    {/* Time & Category Pill */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                        <Clock className="w-3 h-3 text-stone-500" />
                        {stop.time}
                      </span>
                      <span className="text-xs font-medium text-stone-500">
                        {getCategoryEmoji(stop.category)} {t.categories[stop.category] || stop.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mark as Visited Checkbox */}
                <button
                  type="button"
                  onClick={(e) => handleToggle(stop.id, e)}
                  title={isVisited ? t.visited : t.markVisited}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    isVisited
                      ? 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                      : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {isVisited ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
              </div>

              {/* Title & Description */}
              <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2 ${
                isVisited ? 'text-stone-600 line-through' : 'text-stone-900'
              }`}>
                {stop.name}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {stop.description}
              </p>

              {/* Insider Tip Highlight Box */}
              {stop.insiderTip && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-xs text-amber-950 mb-4 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold mr-1">{t.insiderSecret}</span>
                    <span>{stop.insiderTip}</span>
                  </div>
                </div>
              )}

              {/* Footer specs & Actions */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-stone-100 flex-wrap">
                <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
                  <span className="flex items-center gap-1">
                    <span className="text-stone-400 font-normal">{t.cost}</span>
                    <span className="text-stone-900 font-bold">
                      {stop.estimatedCost === 0 
                        ? t.free 
                        : `${stop.estimatedCost} ${itinerary.budgetBreakdown.currency}`}
                    </span>
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1">
                    <span className="text-stone-400 font-normal">{t.duration}</span>
                    <span className="text-stone-800">{stop.durationMinutes} min</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Swap stop button */}
                  <button
                    type="button"
                    disabled={isSwapping}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSwapStop(stop.id);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                    title={t.swapStop}
                  >
                    <RefreshCw className={`w-3 h-3 ${isSwapping ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">
                      {isSwapping ? t.swapping : t.swapStop}
                    </span>
                  </button>

                  {/* Google Maps Link */}
                  <a
                    href={stop.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-sm"
                  >
                    <span>{t.openInGoogleMaps}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Transit to Next Stop Divider */}
            {stop.transitToNext && index < itinerary.stops.length - 1 && (
              <div className="py-2.5 px-6 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-stone-100/90 border border-stone-200/80 px-3.5 py-1.5 rounded-full text-xs text-stone-600 shadow-xs">
                  {getTransitIcon(stop.transitToNext.mode)}
                  <span className="font-medium">
                    {stop.transitToNext.description}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
