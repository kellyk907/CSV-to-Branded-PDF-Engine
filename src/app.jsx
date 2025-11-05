import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const SAMPLE = {
  es: [
    { en: "Hello", target: "Hola" },
    { en: "Thank you", target: "Gracias" },
    { en: "Water", target: "Agua" }
  ],
  zh: [
    { en: "Hello", target: "你好" },
    { en: "Thank you", target: "谢谢" },
    { en: "Water", target: "水" }
  ]
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [cards, setCards] = useState([]);
  const [en, setEn] = useState('');
  const [target, setTarget] = useState('');
  const [flip, setFlip] = useState({});
  const lang = i18n.language === 'zh' ? 'zh' : 'es';

  useEffect(() => {
    const saved = localStorage.getItem(`cards_${lang}`);
    setCards(saved ? JSON.parse(saved) : SAMPLE[lang]);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(`cards_${lang}`, JSON.stringify(cards));
  }, [cards, lang]);

  const add = () => {
    if (en.trim() && target.trim()) {
      setCards([...cards, { en, target }]);
      setEn(''); setTarget('');
    }
  };

  const remove = (i) => {
    setCards(cards.filter((_, idx) => idx !== i));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700">{t('title') || 'Bilingual Flashcards'}</h1>
          <p className="text-gray-600 mt-2">English → {lang === 'es' ? 'Español' : '中文'}</p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <
