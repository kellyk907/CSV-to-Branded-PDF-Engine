import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "Bilingual Flashcard Generator",
          subtitle: "English → Spanish or Chinese",
          langToggle: "中文",
          addCard: "Add Card",
          front: "Front",
          back: "Back",
          delete: "Delete",
          noCards: "No cards yet. Add one!",
          clearAll: "Clear All"
        }
      },
      es: {
        translation: {
          title: "Generador de Tarjetas Bilingües",
          subtitle: "Inglés → Español o Chino",
          langToggle: "中文",
          addCard: "Añadir Tarjeta",
          front: "Frente",
          back: "Reverso",
          delete: "Borrar",
          noCards: "Aún no hay tarjetas. ¡Añade una!",
          clearAll: "Borrar Todo"
        }
      },
      zh: {
        translation: {
          title: "双语闪卡生成器",
          subtitle: "英语 → 西班牙语或中文",
          langToggle: "Español",
          addCard: "添加卡片",
          front: "正面",
          back: "背面",
          delete: "删除",
          noCards: "还没有卡片。添加一张吧！",
          clearAll: "清除全部"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
