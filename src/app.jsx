import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

const SAMPLE = {
  es: [{ en: "Hello", target: "Hola" }, { en: "Water", target: "Agua" }],
  zh: [{ en: "Hello", target: "你好" }, { en: "Water", target: "水" }]
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
    if (en && target) {
      setCards([...cards, { en, target }]);
      setEn(''); setTarget('');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4f46e5' }}>{t('title')}</h1>

      <div style={{ textAlign: 'center', margin: '20px' }}>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
          style={{ padding: '10px 20px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '8px' }}
        >
          {i18n.language === 'zh' ? 'Español' : '中文'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
        <input value={en} onChange={e => setEn(e.target.value)} placeholder="English" style={{ padding: '12px', border: '2px solid #ddd', borderRadius: '8px' }} />
        <input value={target} onChange={e => setTarget(e.target.value)} placeholder={lang === 'es' ? 'Español' : '中文'} style={{ padding: '12px', border: '2px solid #ddd', borderRadius: '8px' }} />
        <button onClick={add} style={{ padding: '12px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px' }}>{t('addCard')}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {cards.map((c, i) => (
          <div
            key={i}
            onClick={() => setFlip({ ...flip, [i]: !flip[i] })}
            style={{ height: '180px', perspective: '1000px', cursor: 'pointer' }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', transition: '0.6s', transformStyle: 'preserve-3d', transform: flip[i] ? 'rotateY(180deg)' : '' }}>
              <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #3b82f6, #1e40af)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>{c.en}</p>
              </div>
              <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, #ec4899, #a21caf)', color: 'white', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', transform: 'rotateY(180deg)' }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>{c.target}</p>
                <button
                  onClick={(e) => { e.stopPropagation(); setCards(cards.filter((_, idx) => idx !== i)); }}
                  style={{ marginTop: '8px', padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px' }}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cards.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={() => setCards([])} style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '8px' }}>
            {t('clearAll')}
          </button>
        </div>
      )}
    </div>
  );
}
