import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronDown, Clock, Footprints, MapPin, Play, History, Calendar, Share2, BarChart2, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui';

const ProgressStar = ({ percentage }: { percentage: number }) => {
  const [currentFill, setCurrentFill] = useState(0);

  useEffect(() => {
    // Animate from 0 to percentage
    const timer = setTimeout(() => {
        setCurrentFill(percentage);
    }, 500);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative w-36 h-36 flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
        <defs>
          <linearGradient id="starGradient" x1="0" x2="0" y1="1" y2="0">
            <stop offset={`${currentFill}%`} stopColor="#fbbf24" />
            <stop offset={`${currentFill}%`} stopColor="#e5e7eb" />
          </linearGradient>
           <clipPath id="starClip">
             <path d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" />
           </clipPath>
        </defs>
        
        {/* Background Star (Stroke) */}
        <path 
          d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" 
          fill="none" 
          stroke="#e5e7eb" 
          strokeWidth="4" 
          strokeLinejoin="round"
        />

        {/* Filled Star */}
        <path 
          d="M50 0L61 35H98L68 57L79 91L50 70L21 91L32 57L2 35H39L50 0Z" 
          fill="url(#starGradient)"
          stroke="#fbbf24"
          strokeWidth="2"
          strokeLinejoin="round"
          className="transition-all duration-[2000ms] ease-out"
        />
      </svg>
    </div>
  );
};

export const WorkoutsScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useApp();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [workoutType, setWorkoutType] = useState('Walking');
  const [progress, setProgress] = useState(60); 
  
  const workoutTypes = [
    'Walking', 'Running', 'Cycling', 'Yoga', 'Swimming', 'Dance',
    'Pilates', 'HIIT', 'Strength', 'Hiking', 'Kickboxing', 'Jump Rope',
    'Elliptical', 'Rowing', 'Stretching'
  ];

  return (
    <MobileContainer className="bg-[#fdf2f8] min-h-screen relative flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2 relative">
        <button 
          onClick={() => navigate('/main')}
          className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm border border-gray-100 z-10 rtl:left-auto rtl:right-6"
        >
          {isRTL ? <ChevronRight size={20} className="text-gray-600" /> : <ChevronLeft size={20} className="text-gray-600" />}
        </button>
        <div className="flex items-center justify-center mb-4 pt-2">
            <p className="text-gray-500 text-sm">{t('keepMoving')}</p>
        </div>
        
        <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{t('trainingType')}</p>
            <button 
                onClick={() => setShowTypeModal(true)}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-pink-100"
            >
                <span className="font-semibold text-gray-800">{workoutType}</span>
                <ChevronDown className="text-gray-400" />
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6 space-y-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
        
        {/* Star Progress */}
        <div className="flex flex-col items-center justify-center py-2">
            <ProgressStar percentage={68} />
            <div className="text-center mt-2">
                <h2 className="text-4xl font-bold text-gray-800">5,420</h2>
                <p className="text-gray-500">{t('stepsGoal')}</p>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 w-full">
            <div className="bg-[#effef1] rounded-2xl p-3 flex flex-col items-center justify-center space-y-1 shadow-sm border border-green-100">
                <Clock size={20} className="text-green-600 mb-1" />
                <span className="text-lg font-bold text-gray-800">24m</span>
                <span className="text-xs text-gray-500">{t('time')}</span>
            </div>
             <div className="bg-[#effef1] rounded-2xl p-3 flex flex-col items-center justify-center space-y-1 shadow-sm border border-green-100">
                <Footprints size={20} className="text-green-600 mb-1" />
                <span className="text-lg font-bold text-gray-800">5,420</span>
                <span className="text-xs text-gray-500">{t('steps')}</span>
            </div>
             <div className="bg-[#effef1] rounded-2xl p-3 flex flex-col items-center justify-center space-y-1 shadow-sm border border-green-100">
                <MapPin size={20} className="text-green-600 mb-1" />
                <span className="text-lg font-bold text-gray-800">3.2km</span>
                <span className="text-xs text-gray-500">{t('distance')}</span>
            </div>
        </div>

        {/* Start Button */}
        <Button 
            className="w-full h-16 bg-[#e0cbf7] hover:bg-[#d4bbf0] text-[#5b2f8a] text-lg font-semibold rounded-2xl shadow-sm flex flex-col items-center justify-center gap-1"
        >
            <Play fill="currentColor" size={20} />
            {t('startWorkout')}
        </Button>

        {/* Grid Options */}
        <div className="grid grid-cols-2 gap-4 w-full pb-20">
             <button onClick={() => navigate('/history')} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center justify-center gap-2 h-20 hover:bg-gray-50">
                <History className="text-gray-400" size={24} />
                <span className="text-sm font-medium text-gray-600">{t('history')}</span>
             </button>
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center justify-center gap-2 h-20 hover:bg-gray-50">
                <Calendar className="text-gray-400" size={24} />
                <span className="text-sm font-medium text-gray-600">{t('schedule')}</span>
             </button>
             <button className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center justify-center gap-2 h-20 hover:bg-gray-50">
                <Share2 className="text-gray-400" size={24} />
                <span className="text-sm font-medium text-gray-600">{t('share')}</span>
             </button>
             <button onClick={() => navigate('/summary')} className="bg-white p-4 rounded-2xl shadow-sm border border-pink-50 flex flex-col items-center justify-center gap-2 h-20 hover:bg-gray-50">
                <BarChart2 className="text-gray-400" size={24} />
                <span className="text-sm font-medium text-gray-600">{t('summary')}</span>
             </button>
        </div>
      </div>

      {/* Bottom Toggle */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1 shadow-lg border border-gray-100 flex">
            <button className="px-6 py-2 rounded-full bg-gray-100 text-gray-800 font-medium text-sm transition-colors">
                {t('training')}
            </button>
            <button 
                onClick={() => navigate('/points')}
                className="px-6 py-2 rounded-full text-gray-500 font-medium text-sm hover:bg-gray-50 transition-colors"
            >
                {t('points')}
            </button>
        </div>
      </div>

      {/* Workout Type Modal */}
      <AnimatePresence>
        {showTypeModal && (
            <motion.div 
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowTypeModal(false)}
                className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
            />
        )}
        {showTypeModal && (
            <motion.div 
                key="modal"
                initial={{ y: -20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                className="absolute top-[120px] left-6 right-6 bg-white rounded-2xl z-50 shadow-xl border border-gray-100 overflow-hidden max-h-[300px] overflow-y-auto [&::-webkit-scrollbar]:hidden"
            >
                <div className="flex flex-col">
                    {workoutTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => {
                                setWorkoutType(type);
                                setShowTypeModal(false);
                            }}
                            className={`p-4 text-left font-medium hover:bg-pink-50 transition-colors ${workoutType === type ? 'bg-pink-50 text-pink-600' : 'text-gray-700'}`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
