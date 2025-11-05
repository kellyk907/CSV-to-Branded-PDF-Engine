import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "Bilingual Flashcard Generator",
          subtitle: "English to Spanish or Chinese",
          addCard: "Add Card",
          delete: "Delete",
          noCards: "No cards yet. Add one!",
          clearAll: "Clear All"
        }
      },
      es: {
        translation: {
          title: "Generador de Tarjetas Bilingües",
          subtitle: "Inglés to Español o Chino",
          addCard: "Añadir Tarjeta",
          delete: "Borrar",
          noCards: "Aún no hay tarjetas",
          clearAll: "Borrar Todo"
        }
      },
      zh: {
        translation: {
          title: "双语闪卡生成器",
          subtitle: "英语 to 西班牙语或中文",
          addCard: "添加卡片",
          delete: "删除",
          noCards: "还没有卡片",
          clearAll: "清除全部"
        }
      }
    },
    lng: "en",
    fallbackLng: "en"
  });

export default i18n;
