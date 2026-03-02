import React from 'react';
import { motion, Variants } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { Settings, Star, Utensils, Users, Dumbbell, Sparkles } from 'lucide-react';
import { Character } from '../components/Character';

export const MainScreen = () => {
  const { t, points, characterState } = useApp();
  const navigate = useNavigate();

  // Animation variants for floating effect - Fixed Types
  const floatingVariant: Variants = {
    animate: (custom: number) => ({
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1] as [number, number, number, number],
        delay: custom * 0.4,
      },
    }),
  };

  return (
    <MobileContainer className="bg-white min-h-screen relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 w-full absolute top-0 left-0 right-0 z-20">
        {/* Points Display */}
        <div
          onClick={() => navigate('/points')}
          className="flex items-center bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-sm space-x-2 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <Star className="text-yellow-400 fill-yellow-400" size={16} />
          <span className="font-bold text-gray-800 text-sm">{points}</span>
        </div>

        {/* Settings */}
        <button
          onClick={() => navigate('/settings')}
          className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-100"
        >
          <Settings className="text-gray-600" size={20} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative w-full px-4">

        {/* Welcome Text */}
        <div className="absolute top-24 w-full text-center z-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">{t('welcomeBack') || "Welcome Back"}</h2>
          <p className="text-gray-500">{t('readyForGoals') || "Ready for your daily goals?"}</p>
        </div>

        {/* Layout Container */}
        <div className="relative w-full max-w-sm h-[400px] flex items-center justify-center mt-12">

          {/* Social Button (Top Center) */}
          <motion.div
            custom={0}
            variants={floatingVariant}
            animate="animate"
            className="absolute top-0 left-1/2 -translate-x-1/2 z-20"
            onClick={() => navigate('/social')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-32 h-20 bg-blue-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-blue-200 transition-colors border border-blue-50">
                <Users className="text-blue-600" size={32} />
              </div>
              <span className="font-bold text-gray-700 text-lg">{t('social')}</span>
            </div>
          </motion.div>

          <motion.div
            custom={1.5}
            variants={floatingVariant}
            animate="animate"
            className="relative z-10 w-56 h-56 flex items-center justify-center mt-12 cursor-pointer group"
            onClick={() => navigate('/character')}
          >
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-2 rounded-full shadow-lg z-30 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>

            {/* Layered Character */}
            <Character state={characterState} size="lg" />
          </motion.div>

          {/* Workouts Button (Bottom Left) */}
          <motion.div
            custom={1}
            variants={floatingVariant}
            animate="animate"
            className="absolute bottom-0 left-2 z-20"
            onClick={() => navigate('/workouts')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-28 h-28 bg-orange-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-orange-200 transition-colors border border-orange-50">
                <Dumbbell className="text-orange-600" size={32} />
              </div>
              <span className="font-bold text-gray-700 text-lg">{t('workouts')}</span>
            </div>
          </motion.div>

          {/* Nutrition Button (Bottom Right) */}
          <motion.div
            custom={2}
            variants={floatingVariant}
            animate="animate"
            className="absolute bottom-0 right-2 z-20"
            onClick={() => navigate('/nutrition')}
          >
            <div className="flex flex-col items-center gap-2 cursor-pointer group">
              <div className="w-28 h-28 bg-green-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-green-200 transition-colors border border-green-50">
                <Utensils className="text-green-600" size={32} />
              </div>
              <span className="font-bold text-gray-700 text-lg">{t('nutrition')}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileContainer>
  );
};