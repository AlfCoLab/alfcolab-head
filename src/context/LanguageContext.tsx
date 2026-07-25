import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'it';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header & Nav
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.backToLab': 'Back to Alf&Co LAB',
    
    // Hero
    'hero.badge': 'Small products for everyday life',
    'hero.title': 'Simple tools for everyday tasks.',
    'hero.desc': 'Alf&Co LAB is the laboratory of Alf&Co Solutions, where small apps are born for everyday people. Nothing complex, just useful tools to simplify your daily routine: studying, taking notes, managing habits.',
    'hero.motto': 'Less stress. More calm.',
    
    // App Cards
    'app.verbio.desc': 'Practice English irregular verbs daily.',
    'app.notes.name': 'Notes',
    'app.notes.desc': 'Quick notes for your ideas.',
    'app.habits.name': 'Habits',
    'app.habits.desc': 'Build your daily routines.',
    'app.tracker.name': 'Tracker',
    'app.tracker.desc': 'Manage payments & projects.',
    
    // Badges & CTA
    'badge.beta': 'Beta',
    'badge.soon': 'Soon',
    'badge.inDev': 'In development',
    'btn.openPage': 'Open page',
    'btn.openWebApp': 'Open Web App',
    'btn.gotIt': 'Got it',
    
    // Verbio Detail / Study Card
    'verbio.tagline': 'Master English irregular verbs with simple daily practice.',
    'verbio.detail': 'Verbio helps you train English irregular verbs through short, regular exercises. Perfect for English learners, students, and anyone wanting to remember verb forms faster in everyday life.',
    'verbio.webVersion': 'Web Version',
    'verbio.publicBeta': 'Public beta is open to everyone.',
    'verbio.studyCard': 'Study card',
    'verbio.irregularVerb': 'Irregular verb',
    'verbio.pastSimple': 'Past Simple',
    'verbio.pastParticiple': 'Past Participle',
    
    // Footer & Support
    'footer.madeWithCare': 'Made with care for people',
    'footer.kofi': 'Buy us a coffee on Ko-fi ☕',
    'cta.join': 'Join us and make work effortless. Start your journey today.',
  },
  it: {
    // Header & Nav
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Progetti',
    'nav.backToLab': 'Torna ad Alf&Co LAB',
    
    // Hero
    'hero.badge': 'Piccoli prodotti per la vita di tutti i giorni',
    'hero.title': 'Strumenti semplici per compiti quotidiani.',
    'hero.desc': 'Alf&Co LAB è il laboratorio di Alf&Co Solutions, dove nascono piccole app per le persone comuni. Niente di complesso, solo strumenti utili per semplificare la tua routine quotidiana: studiare, prendere appunti, gestire le abitudini.',
    'hero.motto': 'Meno stress. Più calma.',
    
    // App Cards
    'app.verbio.desc': 'Pratica i verbi irregolari inglesi ogni giorno.',
    'app.notes.name': 'Notes',
    'app.notes.desc': 'Appunti rapidi per le tue idee.',
    'app.habits.name': 'Habits',
    'app.habits.desc': 'Costruisci le tue routine quotidiane.',
    'app.tracker.name': 'Tracker',
    'app.tracker.desc': 'Gestisci pagamenti e progetti.',
    
    // Badges & CTA
    'badge.beta': 'Beta',
    'badge.soon': 'In arrivo',
    'badge.inDev': 'In sviluppo',
    'btn.openPage': 'Apri pagina',
    'btn.openWebApp': 'Apri Web App',
    'btn.gotIt': 'Capito',
    
    // Verbio Detail / Study Card
    'verbio.tagline': "Padroneggia i verbi irregolari inglesi con un po' di pratica quotidiana.",
    'verbio.detail': "Verbio ti aiuta ad allenare i verbi irregolari inglesi attraverso brevi esercizi regolari. Perfetto per chi studia l'inglese, per studenti e per chiunque voglia ricordare le forme dei verbi più velocemente.",
    'verbio.webVersion': 'Versione Web',
    'verbio.publicBeta': 'Il beta pubblico è aperto a tutti.',
    'verbio.studyCard': 'Carta di studio',
    'verbio.irregularVerb': 'Verbo irregolare',
    'verbio.pastSimple': 'Past Simple',
    'verbio.pastParticiple': 'Past Participle',
    
    // Footer & Support
    'footer.madeWithCare': 'Fatto con cura per le persone',
    'footer.kofi': 'Offrici un caffè su Ko-fi ☕',
    'cta.join': 'Unisciti a noi e rendi il lavoro un gioco da ragazzi. Inizia oggi.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('alfcolab_lang');
    return (saved === 'it' || saved === 'en') ? saved : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('alfcolab_lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
