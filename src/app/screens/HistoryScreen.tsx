import React from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Clock, MapPin, Footprints, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const historyData = [
  { id: 1, date: 'Today, 3:45 PM', type: 'Walking', duration: '24m', steps: '5,420', distance: '3.2km', status: 'active' },
  { id: 2, date: 'Yesterday, 5:20 PM', type: 'Running', duration: '32m', steps: '7,840', distance: '5.8km', status: 'active' },
  { id: 3, date: 'Feb 9, 4:15 PM', type: 'Cycling', duration: '45m', distance: '12.5km', status: 'active' },
  { id: 4, date: 'Feb 8, 6:30 PM', type: 'Yoga', duration: '30m', status: 'completed' },
  { id: 5, date: 'Feb 7, 7:00 AM', type: 'Walking', duration: '28m', steps: '6,240', distance: '3.8km', status: 'active' },
  { id: 6, date: 'Feb 6, 5:45 PM', type: 'Dance', duration: '40m', calories: '320 kcal', status: 'active' },
  { id: 7, date: 'Feb 5, 8:00 AM', type: 'Running', duration: '25m', steps: '4,500', distance: '3.5km', status: 'active' },
  { id: 8, date: 'Feb 4, 6:00 PM', type: 'HIIT', duration: '20m', calories: '280 kcal', status: 'completed' },
  { id: 9, date: 'Feb 3, 5:15 PM', type: 'Walking', duration: '35m', steps: '6,800', distance: '4.2km', status: 'active' },
  { id: 10, date: 'Feb 2, 9:00 AM', type: 'Swimming', duration: '45m', distance: '1.2km', status: 'active' },
  { id: 11, date: 'Feb 1, 4:30 PM', type: 'Cycling', duration: '50m', distance: '15.0km', status: 'active' },
];

export const HistoryScreen = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <MobileContainer className="bg-[#f3f4f6] min-h-screen flex flex-col relative overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-2 pt-12 flex items-center relative justify-center bg-white/50 backdrop-blur-sm z-10">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:bg-gray-50"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-slate-800">{t('workoutHistory')}</h1>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:hidden pb-24">
        {historyData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100/50"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-400 text-xs font-medium mb-1">{item.date}</p>
                <h3 className="text-xl font-bold text-slate-800">{item.type}</h3>
              </div>
              <div className="bg-[#f3e8ff] text-[#9333ea] px-3 py-1 rounded-xl text-xs font-bold">
                {item.duration}
              </div>
            </div>

            <div className="flex gap-3">
              {item.status === 'completed' ? (
                <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100">
                  <CheckCircle size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-600">{t('completed')}</span>
                </div>
              ) : (
                <>
                  {item.steps && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <Footprints size={16} className="text-green-500/70" />
                      <span className="text-sm font-medium text-gray-600">{item.steps}</span>
                    </div>
                  )}
                  {item.distance && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <MapPin size={16} className="text-green-500/70" />
                      <span className="text-sm font-medium text-gray-600">{item.distance}</span>
                    </div>
                  )}
                   {item.calories && !item.steps && !item.distance && (
                    <div className="flex items-center gap-2 bg-[#ecfdf5] px-3 py-2 rounded-xl border border-green-100 min-w-[100px]">
                      <span className="text-sm font-medium text-gray-600">{item.calories}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
       {/* Bottom Toggle */}
       <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-full p-1 shadow-lg border border-gray-100 flex">
            <button onClick={() => navigate('/workouts')} className="px-6 py-2 rounded-full text-gray-500 font-medium text-sm hover:bg-gray-50 transition-colors">
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
    </MobileContainer>
  );
};
