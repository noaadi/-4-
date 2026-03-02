import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Star, ChevronRight, X, TrendingUp, TrendingDown, Coffee, Music, Gift } from 'lucide-react';
import { Button } from '../components/ui';

export const PointsScreen = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useApp();
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showRewards, setShowRewards] = useState(false);

  const pointsHistory = [
    { id: 1, title: 'Completed 5km run', date: 'Feb 7, 2026', points: 150, type: 'earn' },
    { id: 2, title: 'Daily yoga session', date: 'Feb 6, 2026', points: 100, type: 'earn' },
    { id: 3, title: 'Music streaming voucher', date: 'Feb 5, 2026', points: -200, type: 'spend' },
    { id: 4, title: 'Weekly goal achieved', date: 'Feb 4, 2026', points: 200, type: 'earn' },
    { id: 5, title: '30-min dance workout', date: 'Feb 3, 2026', points: 75, type: 'earn' },
  ];

  const rewards = [
    { id: 1, title: 'Coffee Voucher', cost: 150, icon: <Coffee size={24} className="text-orange-500" />, color: 'bg-orange-100' },
    { id: 2, title: 'Music Streaming', cost: 200, icon: <Music size={24} className="text-purple-500" />, color: 'bg-purple-100' },
    { id: 3, title: 'Gift Card $10', cost: 500, icon: <Gift size={24} className="text-pink-500" />, color: 'bg-pink-100' },
    { id: 4, title: 'Pro Subscription', cost: 1000, icon: <Star size={24} className="text-yellow-500" />, color: 'bg-yellow-100' },
  ];

  return (
    <MobileContainer className="bg-[#fdf2f8] min-h-screen relative flex flex-col">
       {/* Header */}
       <div className="p-6 pb-2 flex items-center">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-black/5 text-gray-500">
                <ArrowLeft size={24} className={isRTL ? "rotate-180" : ""} />
            </button>
            <span className="ml-2 text-gray-500 font-medium">Track your progress</span>
       </div>

       <div className="flex-1 px-6 space-y-6 overflow-y-auto pb-24">
            {/* Total Points Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 flex flex-col items-center justify-center space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-full -mr-10 -mt-10 opacity-50 blur-2xl"></div>
                <span className="text-gray-500 font-medium">Total Points</span>
                <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-yellow-400" size={32} />
                    <span className="text-5xl font-bold text-gray-800">2,450</span>
                </div>
                
                <button 
                    onClick={() => setShowBreakdown(true)}
                    className="mt-4 px-6 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1 hover:bg-purple-200 transition-colors"
                >
                    Points Breakdown <ChevronRight size={16} className={isRTL ? "rotate-180" : ""} />
                </button>
            </div>

            {/* Points History Preview */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Points History</h3>
                    <button onClick={() => setShowHistory(true)} className="text-sm text-gray-500 hover:text-gray-800">View all &gt;</button>
                </div>
                
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
                    {pointsHistory.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${item.type === 'earn' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {item.type === 'earn' ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                                    <p className="text-xs text-gray-400">{item.date}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-gray-500'}`}>
                                {item.type === 'earn' ? '+' : ''}{item.points}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rewards Shop Preview */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Rewards Shop</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    {rewards.slice(0, 2).map((reward) => (
                        <div key={reward.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2">
                            <div className={`p-3 rounded-full ${reward.color} mb-1`}>
                                {reward.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-800">{reward.title}</span>
                            <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                                <Star size={12} fill="currentColor" />
                                {reward.cost}
                            </div>
                        </div>
                    ))}
                </div>
                
                <Button 
                    onClick={() => setShowRewards(true)}
                    variant="secondary" 
                    fullWidth 
                    className="bg-white border border-gray-200 shadow-sm text-gray-600 hover:bg-gray-50"
                >
                    View All Rewards
                </Button>
            </div>
       </div>

        {/* Bottom Toggle */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md rounded-full p-1 shadow-lg border border-gray-100 flex pointer-events-auto">
                <button 
                    onClick={() => navigate('/workouts')}
                    className="px-6 py-2 rounded-full text-gray-500 font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                    Training
                </button>
                <button 
                    className="px-6 py-2 rounded-full bg-[#e0cbf7] text-[#5b2f8a] font-medium text-sm transition-colors"
                >
                    Points
                </button>
            </div>
        </div>

       {/* Modals */}
       <AnimatePresence>
            {/* Breakdown Modal */}
            {showBreakdown && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                     <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl relative">
                        <button onClick={() => setShowBreakdown(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Points Breakdown</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Workouts Completed</span><span className="font-bold text-green-600">+1200</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Weekly Goals</span><span className="font-bold text-green-600">+800</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Daily Streaks</span><span className="font-bold text-green-600">+450</span></div>
                            <div className="flex justify-between text-sm"><span className="text-gray-600">Bonus Challenges</span><span className="font-bold text-green-600">+350</span></div>
                            <div className="flex justify-between text-sm pt-2 border-t border-gray-100"><span className="text-gray-600">Points Spent</span><span className="font-bold text-red-500">-350</span></div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t border-gray-200"><span className="text-gray-800">Total Points</span><span>2450</span></div>
                        </div>
                        <Button fullWidth onClick={() => setShowBreakdown(false)} className="mt-8 bg-[#e0cbf7] text-[#5b2f8a] hover:bg-[#d4bbf0]">Close</Button>
                     </motion.div>
                </motion.div>
            )}

            {/* History Modal */}
            {showHistory && (
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                     <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl relative max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Full History</h3>
                            <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                             {pointsHistory.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${item.type === 'earn' ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {item.type === 'earn' ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                    <span className={`font-bold ${item.type === 'earn' ? 'text-green-600' : 'text-gray-500'}`}>
                                        {item.type === 'earn' ? '+' : ''}{item.points}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Button fullWidth onClick={() => setShowHistory(false)} className="mt-6 bg-[#e0cbf7] text-[#5b2f8a] hover:bg-[#d4bbf0]">Close</Button>
                     </motion.div>
                </motion.div>
            )}

            {/* Rewards Modal */}
            {showRewards && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                     <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl relative max-h-[80vh] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Rewards Shop</h3>
                            <button onClick={() => setShowRewards(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1">
                            {rewards.map((reward) => (
                                <div key={reward.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-2 hover:border-purple-200 transition-colors cursor-pointer">
                                    <div className={`p-3 rounded-full ${reward.color} mb-1`}>
                                        {reward.icon}
                                    </div>
                                    <span className="text-sm font-bold text-gray-800">{reward.title}</span>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                                        <Star size={12} fill="currentColor" />
                                        {reward.cost}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button fullWidth onClick={() => setShowRewards(false)} className="mt-6 bg-[#e0cbf7] text-[#5b2f8a] hover:bg-[#d4bbf0]">Close</Button>
                     </motion.div>
                </motion.div>
            )}
       </AnimatePresence>
    </MobileContainer>
  );
};
