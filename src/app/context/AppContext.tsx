import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from './translations';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  userData: any;
  updateUserData: (data: any) => void;
  isRTL: boolean;
  points: number;
  addPoints: (amount: number) => void;
  deductPoints: (amount: number) => boolean;
  nutritionData: any;
  updateNutritionData: (data: any) => void;
  socialData: any;
  updateSocialData: (data: any) => void;
  characterState: any;
  updateCharacterState: (data: any) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('he');
  const [userData, setUserData] = useState<any>({
    age: 14,
    weight: 50,
    height: 160,
  });
  const [points, setPoints] = useState<number>(1250);
  const [nutritionData, setNutritionData] = useState<any>({
    meals: {},
    water: 0,
    archive: []
  });
  const [socialData, setSocialData] = useState<any>({
    registeredCompetitions: [],
    registeredWorkouts: [],
    registeredChallenges: [],
    hasSeenTutorial: false,
  });
  const [characterState, setCharacterState] = useState<any>({
    skin: 'default',
    hat: 'none',
    shirt: 'none',
    pants: 'none',
    shoes: 'none',
    accessory: 'none',
  });

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  const updateUserData = (data: any) => {
    setUserData((prev: any) => ({ ...prev, ...data }));
  };

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  const deductPoints = (amount: number): boolean => {
    if (points >= amount) {
      setPoints((prev) => prev - amount);
      return true;
    }
    return false;
  };

  const updateNutritionData = (data: any) => {
    setNutritionData((prev: any) => ({ ...prev, ...data }));
  };

  const updateSocialData = (data: any) => {
    setSocialData((prev: any) => ({ ...prev, ...data }));
  };

  const updateCharacterState = (data: any) => {
    setCharacterState((prev: any) => ({ ...prev, ...data }));
  };

  const isRTL = language === 'he';

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      t,
      userData,
      updateUserData,
      isRTL,
      points,
      addPoints,
      deductPoints,
      nutritionData,
      updateNutritionData,
      socialData,
      updateSocialData,
      characterState,
      updateCharacterState
    }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen font-sans antialiased text-slate-900 bg-pink-50/30 transition-all duration-300">
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};