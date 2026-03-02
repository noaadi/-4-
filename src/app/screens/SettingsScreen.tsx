import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, Moon, Sun, User, Phone, Database, Globe, Bell, Star, Mail, Lock, LogOut, Trash2, ChevronRight, X 
} from 'lucide-react';
import { Drawer } from 'vaul';
import { Switch } from '../components/ui/Switch'; // Need to check if Switch exists or create it
import { motion } from 'motion/react';

// Simple Switch Component if not exists
const Toggle = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (c: boolean) => void }) => (
  <button 
    onClick={() => onCheckedChange(!checked)}
    className={`w-12 h-6 rounded-full transition-colors flex items-center px-1 ${checked ? 'bg-green-400' : 'bg-gray-200'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

export const SettingsScreen = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage, userData } = useApp();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <MobileContainer className={`min-h-screen relative flex flex-col ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f9fafb] text-slate-900'}`}>
      
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between sticky top-0 z-10 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-600'}`}>
            <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold">{t('settings')}</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-6 [&::-webkit-scrollbar]:hidden">
        
        {/* Dark Mode Toggle */}
        <div className={`p-4 rounded-2xl flex items-center justify-between shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-500'}`}>
                    {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                </div>
                <span className="font-medium">{t('darkMode')}</span>
            </div>
            <Toggle checked={darkMode} onCheckedChange={setDarkMode} />
        </div>

        {/* Profile Section */}
        <div className={`p-4 rounded-2xl flex items-center gap-4 shadow-sm ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User size={32} className="text-gray-400" />
            </div>
            <div>
                <h2 className="text-lg font-bold">{t('userName')}</h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('startJourney')}</p>
            </div>
        </div>

        {/* General Settings Group */}
        <div className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            
            {/* Phone */}
            <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors border-b border-gray-100/10">
                <div className="flex items-center gap-3">
                    <Phone size={20} className="text-green-500" />
                    <span className="font-medium">{t('phoneNumber')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">+1 234 567 890</span>
                    <ChevronRight size={16} />
                </div>
            </button>

            {/* Data Bottom Sheet */}
            <Drawer.Root>
                <Drawer.Trigger asChild>
                    <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors border-b border-gray-100/10">
                        <div className="flex items-center gap-3">
                            <Database size={20} className="text-blue-500" />
                            <span className="font-medium">{t('data')}</span>
                        </div>
                        <ChevronRight size={16} className="text-gray-400" />
                    </button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                    <Drawer.Content className="bg-white flex flex-col rounded-t-[32px] mt-24 fixed bottom-0 left-0 right-0 z-50 max-h-[90vh]">
                        <div className="p-4 bg-white rounded-t-[32px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                            <div className="max-w-md mx-auto space-y-6 pb-12">
                                <h2 className="text-2xl font-bold text-gray-900">{t('yourData')}</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
                                        <span className="text-gray-500">{t('weight')}</span>
                                        <span className="font-bold text-gray-900">{userData?.weight || 60} {t('kg')}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
                                        <span className="text-gray-500">{t('height')}</span>
                                        <span className="font-bold text-gray-900">{userData?.height || 170} {t('cm')}</span>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
                                        <span className="text-gray-500">{t('age')}</span>
                                        <span className="font-bold text-gray-900">{userData?.age || 24} {t('yearsOld')}</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-700">{t('edit')}</button>
                                    <Drawer.Close asChild>
                                        <button className="flex-1 py-3 bg-black text-white rounded-xl font-bold">{t('save')}</button>
                                    </Drawer.Close>
                                </div>
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>

            {/* Language */}
            <button 
                onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors border-b border-gray-100/10"
            >
                <div className="flex items-center gap-3">
                    <Globe size={20} className="text-orange-500" />
                    <span className="font-medium">{t('languageLabel')}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">{language === 'en' ? t('english') : t('hebrew')}</span>
                    <ChevronRight size={16} />
                </div>
            </button>

            {/* Notifications */}
            <div className="w-full p-4 flex items-center justify-between border-b border-gray-100/10">
                <div className="flex items-center gap-3">
                    <Bell size={20} className="text-yellow-500" />
                    <span className="font-medium">{t('notifications')}</span>
                </div>
                <Toggle checked={notifications} onCheckedChange={setNotifications} />
            </div>
        </div>

        {/* Support Group */}
        <div className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
            <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors border-b border-gray-100/10">
                <div className="flex items-center gap-3">
                    <Star size={20} className="text-pink-500" />
                    <span className="font-medium">{t('rateUs')}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors">
                <div className="flex items-center gap-3">
                    <Mail size={20} className="text-teal-500" />
                    <span className="font-medium">{t('contactUs')}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
            </button>
        </div>

        {/* Account Actions */}
        <div className={`rounded-2xl shadow-sm overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
             <button className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors border-b border-gray-100/10">
                <div className="flex items-center gap-3">
                    <Lock size={20} className="text-gray-500" />
                    <span className="font-medium">{t('changePassword')}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
            </button>
             <button onClick={() => navigate('/login')} className="w-full p-4 flex items-center justify-between hover:bg-black/5 transition-colors text-red-500">
                <div className="flex items-center gap-3">
                    <LogOut size={20} />
                    <span className="font-medium">{t('logOut')}</span>
                </div>
            </button>
        </div>

        {/* Delete Account */}
        <div className="pt-4 pb-8 flex flex-col items-center gap-4">
             <button className="text-gray-400 text-sm flex items-center gap-2 hover:text-red-500 transition-colors">
                <Trash2 size={14} />
                {t('deleteAccount')}
             </button>
             <span className="text-xs text-gray-300">Version 1.0.2</span>
        </div>

      </div>
    </MobileContainer>
  );
};
