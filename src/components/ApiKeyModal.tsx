import React, { useState, useEffect } from 'react';
import { X, Key, Github, Sparkles, Check, ExternalLink, ShieldCheck, Terminal } from 'lucide-react';
import { 
  getStoredApiKey, 
  saveStoredApiKey, 
  removeStoredApiKey 
} from '../services/geminiService';
import { Language } from '../types/itinerary';
import { translations } from '../i18n/translations';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onApiKeyUpdated: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  language,
  onApiKeyUpdated,
}) => {
  const t = translations[language];
  const [keyInput, setKeyInput] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = getStoredApiKey();
      setKeyInput(existing);
      setHasKey(!!existing);
      setStatusMsg('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (keyInput.trim()) {
      saveStoredApiKey(keyInput.trim());
      setHasKey(true);
      setStatusMsg(t.apiKeySavedSuccess);
    } else {
      removeStoredApiKey();
      setHasKey(false);
      setStatusMsg(t.apiKeyRemoved);
    }
    onApiKeyUpdated();
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleRemove = () => {
    removeStoredApiKey();
    setKeyInput('');
    setHasKey(false);
    setStatusMsg(t.apiKeyRemoved);
    onApiKeyUpdated();
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-stone-900">
              {t.apiKeyModalTitle}
            </h3>
            <span className="text-xs text-stone-500">
              {language === 'uk' ? 'Автономний режим та Gemini AI' : 'Standalone engine & Gemini AI'}
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed mb-5">
          {t.apiKeyDesc}
        </p>

        {/* API Key Input */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 mb-5">
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            {t.apiKeyInputLabel}
          </label>
          <div className="flex gap-2">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder={t.apiKeyPlaceholder}
              className="flex-1 bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-xs font-mono text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {t.saveKey}
            </button>
            {hasKey && (
              <button
                onClick={handleRemove}
                className="px-3 py-2 bg-stone-200 hover:bg-red-100 hover:text-red-700 text-stone-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {t.removeKey}
              </button>
            )}
          </div>

          {statusMsg && (
            <div className="mt-2 text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold hover:underline"
            >
              <span>{t.getFreeKey}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-stone-400">
              {language === 'uk' ? 'Зберігається локально у браузері' : 'Stored locally in browser'}
            </span>
          </div>
        </div>

        {/* GitHub Deployment Instructions */}
        <div className="border-t border-stone-200 pt-4">
          <div className="flex items-center gap-2 mb-2 text-xs font-bold text-stone-900">
            <Github className="w-4 h-4" />
            <span>{t.githubDeployTitle}</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-3">
            {t.githubDeployDesc}
          </p>

          <div className="bg-stone-950 text-stone-200 p-3.5 rounded-2xl font-mono text-[11px] space-y-1 overflow-x-auto">
            <div className="text-stone-400"># 1. {language === 'uk' ? 'Зібрати статичний реліз' : 'Build static bundle'}</div>
            <div className="text-amber-400">npm run build</div>
            <div className="text-stone-400 pt-1"># 2. {language === 'uk' ? 'Викласти папку dist на GitHub Pages' : 'Deploy dist folder to GitHub Pages'}</div>
            <div className="text-emerald-400">npx gh-pages -d dist</div>
          </div>
        </div>
      </div>
    </div>
  );
};
