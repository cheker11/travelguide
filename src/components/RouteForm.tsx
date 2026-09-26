import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Wallet, 
  Clock, 
  Users, 
  Flame, 
  ArrowRight,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { 
  ItineraryRequest, 
  Language, 
  MoodType, 
  BudgetType, 
  PaceType, 
  CompanionType 
} from '../types/itinerary';
import { translations } from '../i18n/translations';

interface RouteFormProps {
  language: Language;
  onGenerate: (request: ItineraryRequest) => void;
  isLoading: boolean;
  initialRequest?: Partial<ItineraryRequest>;
}

export const RouteForm: React.FC<RouteFormProps> = ({
  language,
  onGenerate,
  isLoading,
  initialRequest,
}) => {
  const t = translations[language];

  const [city, setCity] = useState(initialRequest?.city || (language === 'uk' ? 'Київ' : 'Rome'));
  const [budgetType, setBudgetType] = useState<BudgetType>(initialRequest?.budgetType || 'moderate');
  const [customAmount, setCustomAmount] = useState<number>(initialRequest?.customBudgetAmount || 50);
  const [currency, setCurrency] = useState<string>(initialRequest?.currency || (language === 'uk' ? 'UAH' : 'EUR'));
  const [mood, setMood] = useState<MoodType>(initialRequest?.mood || 'foodie');
  const [companion, setCompanion] = useState<CompanionType>(initialRequest?.companion || 'couple');
  const [pace, setPace] = useState<PaceType>(initialRequest?.pace || 'balanced');
  const [startTime, setStartTime] = useState<string>(initialRequest?.startTime || '09:00');
  const [endTime, setEndTime] = useState<string>(initialRequest?.endTime || '22:30');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const quickCitiesUk = ['Київ', 'Львів', 'Одеса', 'Рим', 'Париж', 'Барселона', 'Прага', 'Токіо'];
  const quickCitiesEn = ['Kyiv', 'Lviv', 'Rome', 'Paris', 'Barcelona', 'Tokyo', 'London', 'Prague'];
  const quickCities = language === 'uk' ? quickCitiesUk : quickCitiesEn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    onGenerate({
      city: city.trim(),
      budgetType,
      customBudgetAmount: budgetType === 'custom' ? customAmount : undefined,
      currency,
      mood,
      companion,
      pace,
      startTime,
      endTime,
      language,
    });
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 border border-stone-200/80 transition-all"
    >
      {/* City Section */}
      <div className="space-y-3 mb-8">
        <label className="block text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-500" />
          {t.cityLabel}
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t.cityPlaceholder}
            required
            className="w-full pl-12 pr-4 py-3.5 bg-stone-50 hover:bg-stone-100/60 focus:bg-white text-stone-900 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 transition-all text-lg font-medium outline-none placeholder:text-stone-400"
          />
          <Compass className="w-6 h-6 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Quick city suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-stone-500 font-medium mr-1">{t.quickCities}</span>
          {quickCities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCity(c);
                if (c === 'Київ' || c === 'Львів' || c === 'Одеса') {
                  setCurrency('UAH');
                } else if (c === 'Rome' || c === 'Рим' || c === 'Paris' || c === 'Париж' || c === 'Barcelona' || c === 'Барселона') {
                  setCurrency('EUR');
                } else if (c === 'London') {
                  setCurrency('GBP');
                } else {
                  setCurrency('USD');
                }
              }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                city.toLowerCase() === c.toLowerCase()
                  ? 'bg-amber-500 text-stone-950 font-bold border-amber-500 shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Mood / Vibe Selector */}
      <div className="space-y-3 mb-8">
        <label className="block text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          {t.moodLabel}
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(Object.keys(t.moodOptions) as MoodType[]).map((mKey) => {
            const m = t.moodOptions[mKey];
            const isSelected = mood === mKey;
            return (
              <button
                key={mKey}
                type="button"
                onClick={() => setMood(mKey)}
                className={`text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-md shadow-amber-500/10'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {m.icon}
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-tight ${isSelected ? 'text-amber-950' : 'text-stone-800'}`}>
                    {m.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget Selector */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <Wallet className="w-4 h-4 text-amber-500" />
            {t.budgetLabel}
          </label>

          {/* Currency dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-500">{t.currencyLabel}:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="text-xs font-bold px-2 py-1 bg-stone-100 border border-stone-300 rounded-lg text-stone-800 outline-none cursor-pointer focus:border-amber-500"
            >
              <option value="UAH">UAH (₴)</option>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="PLN">PLN (zł)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(t.budgetOptions) as BudgetType[]).map((bKey) => {
            const b = t.budgetOptions[bKey];
            const isSelected = budgetType === bKey;
            return (
              <button
                key={bKey}
                type="button"
                onClick={() => setBudgetType(bKey)}
                className={`p-3.5 text-left rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/70 shadow-sm shadow-amber-500/10'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {b.symbol}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom amount input if 'custom' is selected */}
        {budgetType === 'custom' && (
          <div className="mt-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center gap-4">
            <span className="text-sm font-semibold text-stone-800">
              {t.customAmountLabel}:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="5000"
                value={customAmount}
                onChange={(e) => setCustomAmount(Number(e.target.value) || 0)}
                className="w-28 px-3 py-1.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-center"
              />
              <span className="font-bold text-stone-700">{currency}</span>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Toggles: Companions, Pace & Active Hours */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-bold text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer py-1"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
          <span>
            {showAdvanced 
              ? (language === 'uk' ? 'Приховати деталі темпу та компанії' : 'Hide pace & companions')
              : (language === 'uk' ? 'Налаштувати компанію, темп та години (+)' : 'Customize companions, pace & active hours (+)')}
          </span>
        </button>

        {showAdvanced && (
          <div className="mt-4 pt-4 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {/* Companions */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                {t.companionLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(t.companionOptions) as CompanionType[]).map((cKey) => {
                  const comp = t.companionOptions[cKey];
                  const isSelected = companion === cKey;
                  return (
                    <button
                      key={cKey}
                      type="button"
                      onClick={() => setCompanion(cKey)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="text-base">{comp.icon}</span>
                      <span className="truncate">{comp.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pace */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-stone-500" />
                {t.paceLabel}
              </label>
              <div className="flex flex-col gap-1.5">
                {(Object.keys(t.paceOptions) as PaceType[]).map((pKey) => {
                  const p = t.paceOptions[pKey];
                  const isSelected = pace === pKey;
                  return (
                    <button
                      key={pKey}
                      type="button"
                      onClick={() => setPace(pKey)}
                      className={`px-3 py-2 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-amber-950'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.title}</div>
                      <div className="text-[10px] text-stone-500">{p.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Hours */}
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-500" />
                {t.timeWindowLabel}
              </label>
              <div className="flex items-center gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                <div className="flex-1">
                  <span className="text-[10px] text-stone-500 block mb-0.5">{t.from}</span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-900 outline-none"
                  />
                </div>
                <span className="text-stone-400 font-bold">—</span>
                <div className="flex-1">
                  <span className="text-[10px] text-stone-500 block mb-0.5">{t.to}</span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs font-bold text-stone-900 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !city.trim()}
        className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 transition-all cursor-pointer shadow-lg active:scale-[0.99] ${
          isLoading
            ? 'bg-stone-800 text-stone-400 cursor-wait'
            : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 shadow-amber-500/25 hover:shadow-amber-500/40'
        }`}
      >
        {isLoading ? (
          <>
            <Compass className="w-6 h-6 animate-spin text-amber-400" />
            <span>{t.generating}</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 text-stone-950" />
            <span>{t.generateBtn}</span>
            <ArrowRight className="w-5 h-5 text-stone-950" />
          </>
        )}
      </button>
    </form>
  );
};
