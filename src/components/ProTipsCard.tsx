import React from 'react';
import { Sparkles, Utensils, Camera, CloudSun, ShieldAlert, Award } from 'lucide-react';
import { DayItinerary, Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface ProTipsCardProps {
  itinerary: DayItinerary;
  language: Language;
}

export const ProTipsCard: React.FC<ProTipsCardProps> = ({ itinerary, language }) => {
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Local Pro Tips / Lifehacks */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-stone-200/50 border border-stone-200/80">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
            {t.proTipsTitle}
          </h4>
        </div>
        <ul className="space-y-2.5">
          {itinerary.localProTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-600 leading-relaxed">
              <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Must-Try Regional Foods */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-stone-200/50 border border-stone-200/80">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
            <Utensils className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
            {t.foodsTitle}
          </h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {itinerary.recommendedFoods.map((food, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-950 text-xs font-semibold border border-orange-200/60"
            >
              <span>🍴</span>
              <span>{food}</span>
            </span>
          ))}
        </div>

        {/* Photo spots & Weather advice */}
        <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
          {itinerary.bestPhotoSpots.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-1.5">
                <Camera className="w-3.5 h-3.5 text-stone-500" />
                <span>{t.photoSpotsTitle}:</span>
              </div>
              <p className="text-xs text-stone-600">
                {itinerary.bestPhotoSpots.join(' &bull; ')}
              </p>
            </div>
          )}

          {itinerary.idealWeatherAdvice && (
            <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 text-xs text-stone-600">
              <CloudSun className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-800 mr-1">{t.weatherTitle}:</span>
                <span>{itinerary.idealWeatherAdvice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
