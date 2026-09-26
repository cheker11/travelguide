import React from 'react';
import { BudgetBreakdown, BudgetType, Language } from '../types/itinerary';
import { translations } from '../i18n/translations';
import { Wallet, Utensils, Ticket, Bus, Coffee, ShieldCheck, Check } from 'lucide-react';

interface BudgetSummaryProps {
  breakdown: BudgetBreakdown;
  budgetType: BudgetType;
  customBudgetAmount?: number;
  language: Language;
}

export const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  breakdown,
  budgetType,
  customBudgetAmount,
  language,
}) => {
  const t = translations[language];

  const categories = [
    {
      label: language === 'uk' ? 'Харчування та напої' : 'Food & Dining',
      amount: breakdown.foodAndDrinks,
      icon: <Utensils className="w-4 h-4 text-orange-500" />,
      color: 'bg-orange-500',
    },
    {
      label: language === 'uk' ? 'Квитки та активності' : 'Sightseeing & Tickets',
      amount: breakdown.activitiesAndTickets,
      icon: <Ticket className="w-4 h-4 text-blue-500" />,
      color: 'bg-blue-500',
    },
    {
      label: language === 'uk' ? 'Міський транспорт' : 'City Transit',
      amount: breakdown.transport,
      icon: <Bus className="w-4 h-4 text-emerald-500" />,
      color: 'bg-emerald-500',
    },
    {
      label: language === 'uk' ? 'Кава, снеки та сувеніри' : 'Coffee, Treats & Souvenirs',
      amount: breakdown.snacksAndSouvenirs,
      icon: <Coffee className="w-4 h-4 text-amber-500" />,
      color: 'bg-amber-500',
    },
    {
      label: language === 'uk' ? 'Резервний буфер (10%)' : 'Safety Buffer (10%)',
      amount: breakdown.emergencyBuffer,
      icon: <ShieldCheck className="w-4 h-4 text-purple-500" />,
      color: 'bg-purple-500',
    },
  ];

  const total = breakdown.totalEstimated || 1;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-stone-200/50 border border-stone-200/80">
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-stone-900 tracking-tight">
              {t.budgetCardTitle}
            </h3>
            <span className="text-xs text-stone-500">
              {budgetType === 'custom' && customBudgetAmount
                ? `${language === 'uk' ? 'Цільовий бюджет' : 'Target budget'}: ${customBudgetAmount} ${breakdown.currency}`
                : t.budgetOptions[budgetType]?.title}
            </span>
          </div>
        </div>

        {/* Total pill */}
        <div className="text-right">
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-stone-950">
            ~{breakdown.totalEstimated} <span className="text-amber-600 text-lg sm:text-xl">{breakdown.currency}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" /> {language === 'uk' ? 'Оптимізовано' : 'Optimized'}
          </span>
        </div>
      </div>

      {/* Progress Multi-Bar */}
      <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden flex mb-6">
        {categories.map((cat, idx) => {
          const pct = Math.max(2, Math.round((cat.amount / total) * 100));
          return (
            <div
              key={idx}
              className={`${cat.color} transition-all`}
              style={{ width: `${pct}%` }}
              title={`${cat.label}: ${cat.amount} ${breakdown.currency}`}
            />
          );
        })}
      </div>

      {/* Categories Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-2xl bg-stone-50/80 border border-stone-100"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white shadow-xs">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-stone-700">
                {cat.label}
              </span>
            </div>
            <span className="text-xs font-bold font-mono text-stone-900">
              {cat.amount} {breakdown.currency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
