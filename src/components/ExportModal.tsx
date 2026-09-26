import React, { useState } from 'react';
import { X, Copy, Check, Calendar, Printer, Share2, Compass, MapPin } from 'lucide-react';
import { DayItinerary, Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface ExportModalProps {
  itinerary: DayItinerary;
  language: Language;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  itinerary,
  language,
  onClose,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  // Generate plain text formatted for sharing via Telegram, WhatsApp, Email, etc.
  const generatePlainText = () => {
    const lines: string[] = [];
    lines.push(`🧭 ${itinerary.city} — ${t.appSubtitle}`);
    lines.push(`✨ ${itinerary.tagline}`);
    lines.push(`💰 ${language === 'uk' ? 'Бюджет' : 'Budget'}: ~${itinerary.budgetBreakdown.totalEstimated} ${itinerary.budgetBreakdown.currency}`);
    lines.push('');
    lines.push(language === 'uk' ? '📍 РОЗКЛАД МАРШРУТУ:' : '📍 ITINERARY SCHEDULE:');
    
    itinerary.stops.forEach((s, idx) => {
      lines.push(`${idx + 1}. [${s.time}] ${s.name}`);
      lines.push(`   ${s.description}`);
      if (s.insiderTip) {
        lines.push(`   💡 ${s.insiderTip}`);
      }
      lines.push(`   🗺️ ${s.googleMapsUrl}`);
      lines.push('');
    });

    if (itinerary.localProTips.length > 0) {
      lines.push(language === 'uk' ? '💡 СЕКРЕТИ МІСТА:' : '💡 LOCAL SECRETS:');
      itinerary.localProTips.forEach(tip => lines.push(`• ${tip}`));
      lines.push('');
    }

    lines.push(`Created with DayRoute (https://github.com)`);
    return lines.join('\n');
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generatePlainText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  // Generate and download .ics calendar file
  const handleDownloadICS = () => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

    const events = itinerary.stops.map((stop, idx) => {
      const times = stop.time.split('-').map(t => t.trim());
      const startTime = times[0] || '09:00';
      const endTime = times[1] || '10:00';

      const startH = startTime.split(':')[0].padStart(2, '0');
      const startM = (startTime.split(':')[1] || '00').padStart(2, '0');
      const endH = endTime.split(':')[0].padStart(2, '0');
      const endM = (endTime.split(':')[1] || '00').padStart(2, '0');

      const dtStart = `${dateStr}T${startH}${startM}00`;
      const dtEnd = `${dateStr}T${endH}${endM}00`;

      return [
        'BEGIN:VEVENT',
        `UID:dayroute-${itinerary.id}-${idx}@travel`,
        `DTSTAMP:${dateStr}T000000Z`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${stop.name} (${itinerary.city})`,
        `DESCRIPTION:${stop.description.replace(/\n/g, ' ')}\\n\\nInsider tip: ${stop.insiderTip.replace(/\n/g, ' ')}\\nGoogle Maps: ${stop.googleMapsUrl}`,
        `LOCATION:${stop.address || stop.name}, ${itinerary.city}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n');
    }).join('\r\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DayRoute//One Day Itinerary//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      events,
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `DayRoute-${itinerary.city.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-stone-900">
              {t.export} &bull; {itinerary.city}
            </h3>
            <p className="text-xs text-stone-500">
              {language === 'uk' 
                ? 'Збережіть у календар, роздрукуйте або надішліть друзям'
                : 'Save to calendar, print, or share with fellow travelers'}
            </p>
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-3 mb-6">
          {/* Copy Text Summary */}
          <button
            onClick={handleCopyText}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/50 flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-stone-700 group-hover:text-amber-600 shadow-xs">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">
                  {copied ? t.copied : t.copySummary}
                </div>
                <div className="text-xs text-stone-500">
                  {language === 'uk' ? 'Формат для Telegram, WhatsApp чи нотаток' : 'Clean text formatted for chat apps & notes'}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-600">
              {copied ? '✓' : 'Copy'}
            </span>
          </button>

          {/* Download .ICS for Calendar */}
          <button
            onClick={handleDownloadICS}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/50 flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-stone-700 group-hover:text-amber-600 shadow-xs">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">
                  {t.calendarExport}
                </div>
                <div className="text-xs text-stone-500">
                  {language === 'uk' ? 'Google Calendar, Apple iCal, Outlook' : 'Sync to Google Calendar, Apple iCal, Outlook'}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              .ICS
            </span>
          </button>

          {/* Print / Save as PDF */}
          <button
            onClick={handlePrint}
            className="w-full p-4 rounded-2xl border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/50 flex items-center justify-between text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-stone-700 group-hover:text-amber-600 shadow-xs">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">
                  {t.print}
                </div>
                <div className="text-xs text-stone-500">
                  {language === 'uk' ? 'Елегантна версія для друку або збереження у PDF' : 'Pocket guide printable sheet or save as PDF'}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              PDF
            </span>
          </button>
        </div>

        {/* Text Preview Snippet */}
        <div className="p-3.5 rounded-2xl bg-stone-100 text-[11px] text-stone-600 font-mono max-h-36 overflow-y-auto leading-relaxed border border-stone-200">
          <div className="font-bold text-stone-800 mb-1">{language === 'uk' ? 'Попередній перегляд тексту:' : 'Text preview:'}</div>
          <pre className="whitespace-pre-wrap font-sans">{generatePlainText().slice(0, 320)}...</pre>
        </div>
      </div>
    </div>
  );
};
