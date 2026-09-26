import React from 'react';
import { Compass, Globe, Bookmark, Sparkles, Settings2, Github } from 'lucide-react';
import { Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSettings: () => void;
  onSurpriseMe: () => void;
  isAiEnabled: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  savedCount,
  onOpenSaved,
  onOpenSettings,
  onSurpriseMe,
  isAiEnabled,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-stone-950 shadow-lg shadow-amber-500/20">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-serif">
                DayRoute
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                1 Day
              </span>
              {isAiEnabled ? (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Sparkles className="w-3 h-3" /> Gemini 2.5
                </span>
              ) : (
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Curated Engine
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 truncate max-w-[200px] sm:max-w-none">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Surprise Me button */}
          <button
            onClick={onSurpriseMe}
            title={t.surpriseMe}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 hover:border-amber-500/40 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t.surpriseMe}</span>
          </button>

          {/* Saved Routes button */}
          <button
            onClick={onOpenSaved}
            className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer active:scale-95"
            title={t.savedRoutes}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t.savedRoutes}</span>
            {savedCount > 0 && (
              <span className="ml-1 w-4 h-4 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* Settings / API Key modal button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors cursor-pointer active:scale-95"
            title={t.settings}
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-stone-800 p-0.5 rounded-lg border border-stone-700 text-xs">
            <button
              onClick={() => onLanguageChange('uk')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                language === 'uk'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              УКР
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ENG
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
