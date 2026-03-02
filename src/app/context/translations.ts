export type Language = 'en' | 'he';

export interface Translations {
  [key: string]: {
    en: string;
    he: string;
  };
}

export const translations: Translations = {
  // Common
  continue: { en: 'Continue', he: 'המשך' },
  next: { en: 'Next', he: 'הבא' },
  back: { en: 'Back', he: 'חזור' },
  skip: { en: 'Skip', he: 'דלג' },

  // Login
  email: { en: 'Email', he: 'אימייל' },
  password: { en: 'Password', he: 'סיסמה' },
  login: { en: 'Log In', he: 'התחבר' },
  welcomeBack: { en: 'Welcome back!', he: 'ברוך שובך!' },
  readyForGoals: { en: 'Ready for your daily goals?', he: 'מוכן ליעדים היומיים שלך?' },
  gettingStarted: { en: 'Getting started!', he: 'מתחילים!' },
  createAccount: { en: 'New? Create Account', he: 'חדש? צור חשבון' },
  orLoginWith: { en: 'Or log in with', he: 'או התחבר באמצעות' },

  // Post Login Popup
  changeLater: { en: 'You can change all details later.', he: 'תוכל לשנות את כל הפרטים מאוחר יותר.' },

  // Language Selection
  chooseLanguage: { en: 'Choose Language', he: 'בחר שפה' },
  english: { en: 'English', he: 'אנגלית' },
  hebrew: { en: 'Hebrew', he: 'עברית' },

  // Questionnaire - Gender
  genderQuestion: { en: 'What is your gender?', he: 'מה המין שלך?' },
  male: { en: 'Male', he: 'זכר' },
  female: { en: 'Female', he: 'נקבה' },

  // Questionnaire - Age
  ageQuestion: { en: 'How old are you?', he: 'בן כמה אתה?' },
  yearsOld: { en: 'years old', he: 'שנים' },

  // Questionnaire - Weight/Height
  weightHeightQuestion: { en: 'What is your weight and height?', he: 'מה הגובה והמשקל שלך?' },
  weight: { en: 'Weight', he: 'משקל' },
  height: { en: 'Height', he: 'גובה' },
  kg: { en: 'kg', he: 'ק"ג' },
  cm: { en: 'cm', he: 'ס"מ' },

  // Questionnaire - Goal
  goalQuestion: { en: 'What is your main goal?', he: 'מה המטרה העיקרית שלך?' },
  loseWeight: { en: 'Lose Weight', he: 'לרדת במשקל' },
  buildMuscle: { en: 'Build Muscle', he: 'לבנות שריר' },
  improveEndurance: { en: 'Improve Endurance', he: 'לשפר סיבולת' },
  flexibility: { en: 'Flexibility / Stretching', he: 'גמישות / מתיחות' },
  generalHealth: { en: 'General Health / Well-being', he: 'בריאות כללית / רווחה' },
  funPlay: { en: 'Fun / Play', he: 'כיף / משחק' },
  other: { en: 'Other', he: 'אחר' },
  enterGoal: { en: 'Enter your goal...', he: 'הכנס את המטרה שלך...' },

  // Questionnaire - Fitness Background
  fitnessQuestion: { en: 'What is your fitness background?', he: 'מה הרקע שלך בכושר?' },
  noBackground: { en: 'No background', he: 'אין רקע' },
  beginner: { en: 'Beginner', he: 'מתחיל' },
  intermediate: { en: 'Intermediate', he: 'בינוני' },
  advanced: { en: 'Advanced', he: 'מתקדם' },

  // Questionnaire - Military
  militaryQuestion: { en: 'Are you preparing for military service?', he: 'האם אתה מתכונן לשירות צבאי?' },
  yes: { en: 'Yes', he: 'כן' },
  no: { en: 'No', he: 'לא' },

  // Completion
  allSet: { en: 'All set!', he: 'הכל מוכן!' },
  letsGetStarted: { en: "Let's get started", he: 'בוא נתחיל' },

  // Main
  points: { en: 'Points', he: 'נקודות' },
  nutrition: { en: 'Nutrition', he: 'תזונה' },
  social: { en: 'Social', he: 'חברתי' },
  workouts: { en: 'Workouts', he: 'אימונים' },
  settings: { en: 'Settings', he: 'הגדרות' },

  // Workouts
  keepMoving: { en: 'Keep moving, stay amazing!', he: 'המשיכו לזוז, תישארו מדהימים!' },
  trainingType: { en: 'Training Type', he: 'סוג האימון' },
  stepsGoal: { en: 'of 8,000 steps', he: 'מתוך 8,000 צעדים' },
  steps: { en: 'Steps', he: 'צעדים' },
  distance: { en: 'Distance', he: 'מרחק' },
  time: { en: 'Time', he: 'זמן' },
  startWorkout: { en: 'Start Workout', he: 'התחל אימון' },
  history: { en: 'History', he: 'היסטוריה' },
  schedule: { en: 'Schedule', he: 'לוח זמנים' },
  share: { en: 'Share', he: 'שתף' },
  summary: { en: 'Summary', he: 'סיכום' },
  training: { en: 'Training', he: 'אימון' },

  // History
  workoutHistory: { en: 'Workout History', he: 'היסטוריית אימונים' },
  completed: { en: 'Completed', he: 'הושלם' },
  active: { en: 'Active', he: 'פעיל' },
  today: { en: 'Today', he: 'היום' },
  yesterday: { en: 'Yesterday', he: 'אתמול' },

  // Summary
  activitySummary: { en: 'Activity Summary', he: 'סיכום פעילות' },
  daily: { en: 'Daily', he: 'יומי' },
  weekly: { en: 'Weekly', he: 'שבועי' },
  monthly: { en: 'Monthly', he: 'חודשי' },
  calories: { en: 'Calories', he: 'קלוריות' },
  activeTime: { en: 'Active Time', he: 'זמן פעיל' },
  totalSteps: { en: 'Total Steps', he: 'סה"כ צעדים' },
  totalDistance: { en: 'Total Distance', he: 'סה"כ מרחק' },
  totalCalories: { en: 'Total Calories', he: 'סה"כ קלוריות' },
  totalTime: { en: 'Total Time', he: 'סה"כ זמן' },
  stepsThisWeek: { en: 'Steps this Week', he: 'צעדים השבוע' },
  monthFeb: { en: 'February 2026', he: 'פברואר 2026' },

  // Settings
  darkMode: { en: 'Dark Mode', he: 'מצב כהה' },
  startJourney: { en: 'Start your journey', he: 'התחל את המסע שלך' },
  phoneNumber: { en: 'Phone Number', he: 'מספר טלפון' },
  data: { en: 'Data', he: 'נתונים' },
  yourData: { en: 'Your Data', he: 'הנתונים שלך' },
  age: { en: 'Age', he: 'גיל' },
  edit: { en: 'Edit', he: 'ערוך' },
  save: { en: 'Save', he: 'שמור' },
  notifications: { en: 'Notifications', he: 'התראות' },
  rateUs: { en: 'Rate Us', he: 'דרג אותנו' },
  contactUs: { en: 'Contact Us', he: 'צור קשר' },
  changePassword: { en: 'Change Password', he: 'שנה סיסמה' },
  logOut: { en: 'Log Out', he: 'התנתק' },
  deleteAccount: { en: 'Delete Account', he: 'מחק חשבון' },
  userName: { en: 'User Name', he: 'שם משתמש' },
  languageLabel: { en: 'Language', he: 'שפה' },
  // Character
  character: { en: 'Character', he: 'דמות' },
  dressUp: { en: 'Dress Up', he: 'להלביש' },
  hats: { en: 'Hats', he: 'כובעים' },
  shirts: { en: 'Shirts', he: 'חולצות' },
  pants: { en: 'Pants', he: 'מכנסיים' },
  shoes: { en: 'Shoes', he: 'נעליים' },
  accessory: { en: 'Accessories', he: 'אביזרים' },
  skins: { en: 'Skins', he: 'צבעים' },
  equip: { en: 'Equip', he: 'צייד' },
  remove: { en: 'Remove', he: 'הסר' },
};