import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Camera, Droplet, Smile, Frown, Meh, Sparkles, X, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui';

interface MealData {
  proteins: number;
  carbs: number;
  fats: number;
  calories: number;
  rating: number;
  photoScanned: boolean;
  time: string;
}

export const NutritionScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL, points, addPoints, nutritionData, updateNutritionData } = useApp();

  const [currentMeal, setCurrentMeal] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [mealInput, setMealInput] = useState({ proteins: 0, carbs: 0, fats: 0, calories: 0 });
  const [waterGlasses, setWaterGlasses] = useState(nutritionData.water || 0);
  const [showReward, setShowReward] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const currentHour = new Date().getHours();
  const today = new Date().toDateString();

  const meals = nutritionData.meals[today] || {};

  const getMealTime = (meal: string) => {
    if (meal === 'breakfast') return 5;
    if (meal === 'lunch') return 12;
    if (meal === 'dinner') return 17;
    return 0;
  };

  const isMealUnlocked = (meal: string) => {
    return currentHour >= getMealTime(meal);
  };

  const handleWaterClick = (index: number) => {
    const newWater = index + 1;
    setWaterGlasses(newWater);
    updateNutritionData({ water: newWater });
  };

  const handlePhotoScan = () => {
    // Simulate camera and AI recognition
    setTimeout(() => {
      const randomMacros = {
        proteins: Math.floor(Math.random() * 30) + 10,
        carbs: Math.floor(Math.random() * 50) + 20,
        fats: Math.floor(Math.random() * 20) + 5,
        calories: Math.floor(Math.random() * 400) + 200,
      };
      setMealInput(randomMacros);

      // Show +5 bonus points banner
      setRewardAmount(5);
      setShowReward(true);
      addPoints(5);

      setTimeout(() => setShowReward(false), 3000);
    }, 1500);
  };

  const handleMealSubmit = (rating: number) => {
    const currentTime = new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' });
    const mealData: MealData = {
      ...mealInput,
      rating,
      photoScanned: rewardAmount === 5,
      time: currentTime
    };

    const updatedMeals = {
      ...nutritionData.meals,
      [today]: {
        ...meals,
        [currentMeal!]: mealData
      }
    };

    updateNutritionData({ meals: updatedMeals });

    // Show reward for meal entry
    const basePoints = 10;
    setRewardAmount(basePoints);
    setShowReward(true);
    addPoints(basePoints);

    setTimeout(() => {
      setShowReward(false);
      setShowRating(false);
      setCurrentMeal(null);
      setMealInput({ proteins: 0, carbs: 0, fats: 0, calories: 0 });

      // Check if all 3 meals completed
      const completedMeals = Object.keys(updatedMeals[today] || {}).length;
      if (completedMeals === 3) {
        setTimeout(() => setShowSummary(true), 500);
      }
    }, 2500);
  };

  const handleSummaryComplete = () => {
    addPoints(25);
    setShowSummary(false);

    // Archive today's data
    const archive = [...(nutritionData.archive || []), {
      date: today,
      meals: nutritionData.meals[today],
      water: waterGlasses
    }];
    updateNutritionData({ archive });
  };

  const todayMealsList = Object.values(meals || {}) as MealData[];
  const totalMacros = todayMealsList.reduce(
    (acc, meal) => ({
      proteins: acc.proteins + (meal?.proteins || 0),
      carbs: acc.carbs + (meal?.carbs || 0),
      fats: acc.fats + (meal?.fats || 0),
      calories: acc.calories + (meal?.calories || 0),
    }),
    { proteins: 0, carbs: 0, fats: 0, calories: 0 }
  );

  const mealCount = Object.keys(meals).length;

  const targets = {
    proteins: 120,
    carbs: 200,
    fats: 60,
    calories: 2000
  };

  const ratingEmojis = [
    { emoji: '😫', label: 'גרוע', value: 1 },
    { emoji: '😕', label: 'בסדר', value: 2 },
    { emoji: '😊', label: 'טוב', value: 3 },
    { emoji: '😍', label: 'מעולה', value: 4 },
    { emoji: '🤩', label: 'מושלם!', value: 5 },
  ];

  return (
    <MobileContainer className="min-h-screen relative flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)'
      }}
    >
      {/* Reward Banner */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 shadow-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="text-white" size={24} />
              <div>
                <p className="font-bold text-lg">כל הכבוד! 🎉</p>
                <p className="text-sm">הרווחת +{rewardAmount} נקודות</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 pb-2 relative flex items-center justify-between bg-gradient-to-b from-black/10 to-transparent">
        <button
          onClick={() => navigate('/main')}
          className="p-2 bg-white/90 rounded-full shadow-sm border border-white/50 z-10"
        >
          {isRTL ? <ChevronRight size={20} className="text-gray-700" /> : <ChevronLeft size={20} className="text-gray-700" />}
        </button>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
          <div className="bg-white rounded-full p-1.5">
            <Sparkles className="text-orange-500" size={16} />
          </div>
          <span className="font-bold text-white text-lg">{points}</span>
          <span className="text-white/80 text-sm">נקודות</span>
        </div>

        <button
          onClick={() => setShowArchive(!showArchive)}
          className="p-2 bg-white/90 rounded-full shadow-sm border border-white/50"
        >
          <Calendar size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-6 px-4 pt-4">
        <div className="max-w-md mx-auto space-y-4">

          {/* Greeting */}
          <div className="text-center mb-4">
            <h1 className="text-3xl font-black text-white mb-1">ערב טוב! 👋</h1>
            <p className="text-white/90 text-sm font-medium">בוא נרשום את הארוחות שלך היום</p>
            <p className="text-white/70 text-xs mt-1 bg-white/10 inline-block px-3 py-1 rounded-full">{mealCount} מתוך 3 ארוחות הוזנו</p>
          </div>

          {/* Water Tracker */}
          <div className="bg-white/95 backdrop-blur rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-800">שתיית מים</h3>
                <p className="text-xs text-gray-500">מטרה: 8 כוסות היום</p>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="text-blue-400" size={20} />
                <span className="font-bold text-blue-600">{waterGlasses}/8</span>
                <span className="text-sm text-gray-500">כוסות</span>
              </div>
            </div>

            <div className="flex gap-2 mt-3">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <button
                  key={i}
                  onClick={() => handleWaterClick(i)}
                  className={`flex-1 h-12 rounded-lg transition-all duration-300 ${i < waterGlasses
                    ? 'bg-gradient-to-b from-blue-300 to-blue-400 shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                >
                  {i < waterGlasses && <Droplet className="mx-auto text-white" size={16} />}
                </button>
              ))}
            </div>

            <div className="mt-3 bg-blue-50 rounded-xl p-2 text-center">
              <p className="text-xs text-blue-700">
                {waterGlasses === 0 ? 'התחל לשתות מים!' : waterGlasses >= 8 ? 'מעולה! השלמת את היעד 🎉' : `עוד ${8 - waterGlasses} כוסות ליעד`}
              </p>
            </div>
          </div>

          {/* Meal Cards */}
          <div className="space-y-3">
            {/* Breakfast */}
            <div className={`bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-5 shadow-lg ${!isMealUnlocked('breakfast') ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/30 rounded-full p-2">
                    <span className="text-2xl">☀️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">ארוחת בוקר</h3>
                    <p className="text-white/80 text-xs">
                      {isMealUnlocked('breakfast') ? 'זמין להזנה' : 'זמין מ-05:00'}
                    </p>
                  </div>
                </div>
                {meals.breakfast && (
                  <div className="bg-green-400 rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">מולא</span>
                  </div>
                )}
              </div>

              {!meals.breakfast && isMealUnlocked('breakfast') && (
                <button
                  onClick={() => setCurrentMeal('breakfast')}
                  className="w-full bg-white hover:bg-gray-50 text-orange-600 font-bold py-3 rounded-xl transition-colors"
                >
                  + הזן ארוחה
                </button>
              )}

              {meals.breakfast && (
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-white text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>🍗 חלבון: {meals.breakfast.proteins}g</span>
                    <span>🍞 פחמימות: {meals.breakfast.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥑 שומנים: {meals.breakfast.fats}g</span>
                    <span>🔥 קלוריות: {meals.breakfast.calories}</span>
                  </div>
                  <div className="text-center pt-2 border-t border-white/20">
                    <span className="text-xs">דירוג: {ratingEmojis[meals.breakfast.rating - 1]?.emoji}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lunch */}
            <div className={`bg-gradient-to-br from-green-400 to-green-500 rounded-3xl p-5 shadow-lg ${!isMealUnlocked('lunch') ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/30 rounded-full p-2">
                    <span className="text-2xl">🍔</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">ארוחת צהריים</h3>
                    <p className="text-white/80 text-xs">
                      {isMealUnlocked('lunch') ? 'זמין להזנה' : 'זמין מ-12:00'}
                    </p>
                  </div>
                </div>
                {meals.lunch && (
                  <div className="bg-green-400 rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">מולא</span>
                  </div>
                )}
              </div>

              {!meals.lunch && isMealUnlocked('lunch') && (
                <button
                  onClick={() => setCurrentMeal('lunch')}
                  className="w-full bg-white hover:bg-gray-50 text-green-600 font-bold py-3 rounded-xl transition-colors"
                >
                  + הזן ארוחה
                </button>
              )}

              {meals.lunch && (
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-white text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>🍗 חלבון: {meals.lunch.proteins}g</span>
                    <span>🍞 פחמימות: {meals.lunch.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥑 שומנים: {meals.lunch.fats}g</span>
                    <span>🔥 קלוריות: {meals.lunch.calories}</span>
                  </div>
                  <div className="text-center pt-2 border-t border-white/20">
                    <span className="text-xs">דירוג: {ratingEmojis[meals.lunch.rating - 1]?.emoji}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Dinner */}
            <div className={`bg-gradient-to-br from-purple-400 to-purple-500 rounded-3xl p-5 shadow-lg ${!isMealUnlocked('dinner') ? 'opacity-60' : ''}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-white/30 rounded-full p-2">
                    <span className="text-2xl">🌙</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">ארוחת ערב</h3>
                    <p className="text-white/80 text-xs">
                      {isMealUnlocked('dinner') ? 'זמין להזנה' : 'זמין מ-17:00'}
                    </p>
                  </div>
                </div>
                {meals.dinner && (
                  <div className="bg-green-400 rounded-full px-3 py-1">
                    <span className="text-white text-xs font-bold">מולא</span>
                  </div>
                )}
              </div>

              {!meals.dinner && isMealUnlocked('dinner') && (
                <button
                  onClick={() => setCurrentMeal('dinner')}
                  className="w-full bg-white hover:bg-gray-50 text-purple-600 font-bold py-3 rounded-xl transition-colors"
                >
                  + הזן ארוחה
                </button>
              )}

              {meals.dinner && (
                <div className="bg-white/20 backdrop-blur rounded-xl p-3 text-white text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>🍗 חלבון: {meals.dinner.proteins}g</span>
                    <span>🍞 פחמימות: {meals.dinner.carbs}g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🥑 שומנים: {meals.dinner.fats}g</span>
                    <span>🔥 קלוריות: {meals.dinner.calories}</span>
                  </div>
                  <div className="text-center pt-2 border-t border-white/20">
                    <span className="text-xs">דירוג: {ratingEmojis[meals.dinner.rating - 1]?.emoji}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Edit Reminder */}
          <div className="bg-blue-50 rounded-2xl p-4 text-center">
            <p className="text-sm text-blue-700 font-medium">💡 תמיד אפשר לשנות מה הזנת</p>
          </div>
        </div>
      </div>

      {/* Meal Input Modal */}
      <AnimatePresence>
        {currentMeal && !showRating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setCurrentMeal(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">הזנת ארוחה 🍽️</h2>
                  <button onClick={() => setCurrentMeal(null)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                {/* Photo Scan */}
                <button
                  onClick={handlePhotoScan}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 rounded-2xl mb-4 flex items-center justify-center gap-2"
                >
                  <Camera size={24} />
                  <span>צלם ארוחה +5 נקודות בונוס!</span>
                </button>

                {/* Manual Input */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <ChevronDown size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600 font-medium">מאקרו מזינים</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-orange-50 rounded-xl p-3">
                      <label className="text-xs text-orange-600 mb-1 block">🍗 חלבון (g)</label>
                      <input
                        type="number"
                        value={mealInput.proteins || ''}
                        onChange={(e) => setMealInput({ ...mealInput, proteins: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white rounded-lg px-3 py-2 text-center font-bold border-0"
                        placeholder="0"
                      />
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-3">
                      <label className="text-xs text-yellow-600 mb-1 block">🍞 פחמימות (g)</label>
                      <input
                        type="number"
                        value={mealInput.carbs || ''}
                        onChange={(e) => setMealInput({ ...mealInput, carbs: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white rounded-lg px-3 py-2 text-center font-bold border-0"
                        placeholder="0"
                      />
                    </div>

                    <div className="bg-green-50 rounded-xl p-3">
                      <label className="text-xs text-green-600 mb-1 block">🥑 שומנים (g)</label>
                      <input
                        type="number"
                        value={mealInput.fats || ''}
                        onChange={(e) => setMealInput({ ...mealInput, fats: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white rounded-lg px-3 py-2 text-center font-bold border-0"
                        placeholder="0"
                      />
                    </div>

                    <div className="bg-red-50 rounded-xl p-3">
                      <label className="text-xs text-red-600 mb-1 block">🔥 קלוריות</label>
                      <input
                        type="number"
                        value={mealInput.calories || ''}
                        onChange={(e) => setMealInput({ ...mealInput, calories: parseInt(e.target.value) || 0 })}
                        className="w-full bg-white rounded-lg px-3 py-2 text-center font-bold border-0"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowRating(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl mt-4"
                  >
                    המשך לדירוג →
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    💡 תוסיף לארכיון ותקבל נקודות
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Modal */}
      <AnimatePresence>
        {showRating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm"
            >
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2">איך הייתה הארוחה?</h3>
              <p className="text-sm text-gray-500 text-center mb-6">דרג את הארוחה שלך</p>

              <div className="flex justify-around mb-6">
                {ratingEmojis.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => handleMealSubmit(item.value)}
                    className="flex flex-col items-center gap-2 p-3 hover:bg-gray-50 rounded-2xl transition-all"
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">כל הכבוד! 🎉</h2>
                <p className="text-gray-600">השלמת את כל הארוחות היום</p>
              </div>

              {/* Enhanced Daily Macros Summary */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-[2rem] p-6 mb-6 border border-white/20 backdrop-blur-xl shadow-inner relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-400/20 rounded-full blur-3xl" />

                <h3 className="font-black text-gray-800 mb-5 text-center text-lg tracking-tight">סיכום תזונה יומי 📊</h3>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {/* Proteins */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white flex flex-col items-center">
                    <div className="bg-orange-100 p-2 rounded-xl mb-2">
                      <span className="text-xl">🍗</span>
                    </div>
                    <div className="text-2xl font-black text-orange-600 leading-none">{totalMacros.proteins}g</div>
                    <div className="text-[10px] font-bold text-gray-400 mt-1">חלבון</div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalMacros.proteins / targets.proteins) * 100, 100)}%` }}
                        className="h-full bg-orange-400"
                      />
                    </div>
                  </div>

                  {/* Carbs */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white flex flex-col items-center">
                    <div className="bg-yellow-100 p-2 rounded-xl mb-2">
                      <span className="text-xl">🍞</span>
                    </div>
                    <div className="text-2xl font-black text-yellow-600 leading-none">{totalMacros.carbs}g</div>
                    <div className="text-[10px] font-bold text-gray-400 mt-1">פחמימות</div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalMacros.carbs / targets.carbs) * 100, 100)}%` }}
                        className="h-full bg-yellow-400"
                      />
                    </div>
                  </div>

                  {/* Fats */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white flex flex-col items-center">
                    <div className="bg-green-100 p-2 rounded-xl mb-2">
                      <span className="text-xl">🥑</span>
                    </div>
                    <div className="text-2xl font-black text-green-600 leading-none">{totalMacros.fats}g</div>
                    <div className="text-[10px] font-bold text-gray-400 mt-1">שומנים</div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalMacros.fats / targets.fats) * 100, 100)}%` }}
                        className="h-full bg-green-400"
                      />
                    </div>
                  </div>

                  {/* Calories */}
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-white flex flex-col items-center">
                    <div className="bg-red-100 p-2 rounded-xl mb-2">
                      <span className="text-xl">🔥</span>
                    </div>
                    <div className="text-2xl font-black text-red-600 leading-none">{totalMacros.calories}</div>
                    <div className="text-[10px] font-bold text-gray-400 mt-1">קלוריות</div>
                    <div className="w-full h-1 bg-gray-100 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((totalMacros.calories / targets.calories) * 100, 100)}%` }}
                        className="h-full bg-red-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonus Points */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white text-center mb-4">
                <p className="text-sm mb-1">בונוס השלמה!</p>
                <p className="text-3xl font-bold">+25 נקודות 🏆</p>
              </div>

              <button
                onClick={handleSummaryComplete}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-4 rounded-2xl"
              >
                מעולה! המשך →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archive Modal */}
      <AnimatePresence>
        {showArchive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-end"
            onClick={() => setShowArchive(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-t-3xl w-full max-h-[70vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">ארכיון תזונה 📂</h2>
                  <button onClick={() => setShowArchive(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <X size={20} />
                  </button>
                </div>

                {nutritionData.archive && nutritionData.archive.length > 0 ? (
                  <div className="space-y-3">
                    {nutritionData.archive.map((day: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-2xl p-4">
                        <p className="font-bold text-gray-800 mb-2">{day.date}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>💧 מים: {day.water}/8 כוסות</p>
                          <p>🍽️ ארוחות: {Object.keys(day.meals).length}/3</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto text-gray-300 mb-3" size={48} />
                    <p className="text-gray-500">אין נתונים בארכיון</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
