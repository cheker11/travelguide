import React from 'react';
import { X, Trash2, ArrowRight, Calendar, Bookmark, MapPin, DollarSign } from 'lucide-react';
import { SavedTrip, Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface SavedRoutesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrips: SavedTrip[];
  onSelectTrip: (trip: SavedTrip) => void;
  onDeleteTrip: (tripId: string) => void;
  language: Language;
}

export const SavedRoutesDrawer: React.FC<SavedRoutesDrawerProps> = ({
  isOpen,
  onClose,
  savedTrips,
  onSelectTrip,
  onDeleteTrip,
  language,
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-stone-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-stone-900">
              {t.savedRoutes} ({savedTrips.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trips list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedTrips.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400 mx-auto mb-3">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm text-stone-500 leading-relaxed max-w-xs mx-auto">
                {t.noSavedTrips}
              </p>
            </div>
          ) : (
            savedTrips.map((st) => (
              <div
                key={st.id}
                className="p-4 rounded-2xl border border-stone-200 hover:border-amber-400 bg-white hover:bg-stone-50 transition-all shadow-xs group"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base text-stone-900">
                      {st.itinerary.city}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {st.itinerary.stops.length} {language === 'uk' ? 'локацій' : 'stops'}
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteTrip(st.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title={t.deleteTrip}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-stone-600 line-clamp-1 mb-3">
                  {st.itinerary.tagline}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                  <span className="font-mono font-bold text-stone-800">
                    ~{st.itinerary.budgetBreakdown.totalEstimated} {st.itinerary.budgetBreakdown.currency}
                  </span>

                  <button
                    onClick={() => {
                      onSelectTrip(st);
                      onClose();
                    }}
                    className="flex items-center gap-1 font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                  >
                    <span>{t.openTrip}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
