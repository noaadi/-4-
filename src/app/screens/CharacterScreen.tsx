import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../components/MobileContainer';
import { useApp } from '../context/AppContext';
import { ChevronLeft, Check, Shirt, GraduationCap, Glasses, Palette, Footprints, X } from 'lucide-react';

import { Character } from '../components/Character';

// Character Assets for list
import capImg from '../../assets/character/cap.png';
import jerseyImg from '../../assets/character/jersey.png';
import shadesImg from '../../assets/character/shades.png';

interface Item {
    id: string;
    name: string;
    image: string;
    type: 'hat' | 'shirt' | 'accessory' | 'shoes' | 'skin';
    price?: number;
}

const ITEMS: Item[] = [
    { id: 'cap', name: 'כובע ריצה', image: capImg, type: 'hat' },
    { id: 'jersey', name: 'חולצת ספורט', image: jerseyImg, type: 'shirt' },
    { id: 'shades', name: 'משקפי שמש', image: shadesImg, type: 'accessory' },
];

export const CharacterScreen = () => {
    const { t, characterState, updateCharacterState, isRTL } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<string>('shirt');
    const [localState, setLocalState] = useState(characterState);

    const tabs = [
        { id: 'skin', icon: Palette, label: t('skins') },
        { id: 'shirt', icon: Shirt, label: t('shirts') },
        { id: 'hat', icon: GraduationCap, label: t('hats') },
        { id: 'accessory', icon: Glasses, label: t('accessory') },
        { id: 'shoes', icon: Footprints, label: t('shoes') },
    ];

    const handleSelect = (item: Item) => {
        setLocalState((prev: any) => ({
            ...prev,
            // Toggle: click same item → unequip; click different → equip
            [item.type]: prev[item.type] === item.id ? 'none' : item.id
        }));
    };

    const handleRemove = (type: string) => {
        setLocalState((prev: any) => ({ ...prev, [type]: 'none' }));
    };

    const handleSave = () => {
        updateCharacterState(localState);
        navigate(-1);
    };

    const filteredItems = ITEMS.filter(item => item.type === activeTab);

    // Which items are currently equipped?
    const equippedItems = ITEMS.filter(item => item.id !== 'none' && localState[item.type] === item.id);

    return (
        <MobileContainer className="bg-[#fff5f7] min-h-screen relative flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <ChevronLeft className={isRTL ? 'rotate-180' : ''} size={24} />
                </button>
                <h1 className="text-xl font-bold text-gray-800">{t('dressUp')}</h1>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-full shadow-sm hover:bg-green-600 transition-colors font-bold text-sm flex items-center gap-1"
                >
                    <Check size={16} />
                    <span>שמור</span>
                </button>
            </div>

            {/* Character Preview */}
            <div className="flex-1 flex flex-col items-center justify-center relative p-4">
                <div className="relative w-64 h-64 bg-white/50 backdrop-blur-sm rounded-3xl shadow-inner flex items-center justify-center overflow-visible">
                    <Character state={localState} size="lg" />
                </div>

                {/* Equipped Items Strip */}
                {equippedItems.length > 0 && (
                    <div className="flex gap-2 mt-4 flex-wrap justify-center">
                        {equippedItems.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm border border-pink-100"
                            >
                                <img src={item.image} className="w-5 h-5 object-contain" alt={item.name} />
                                <span className="text-xs font-medium text-gray-700">{item.name}</span>
                                <button
                                    onClick={() => handleRemove(item.type)}
                                    className="ml-1 text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-t-[3rem] shadow-2xl p-6 pb-12">
                <div className="flex justify-between mb-6 overflow-x-auto no-scrollbar gap-2 pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center p-3 rounded-2xl transition-all min-w-[70px] ${activeTab === tab.id
                                ? 'bg-pink-100 text-pink-500 scale-105 shadow-sm'
                                : 'bg-gray-50 text-gray-400'
                                }`}
                        >
                            <tab.icon size={24} />
                            <span className="text-[10px] mt-1 font-bold whitespace-nowrap">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-3 gap-4 max-h-52 overflow-y-auto pr-1">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.length === 0 ? (
                            <div className="col-span-3 flex flex-col items-center py-8 text-gray-300">
                                <span className="text-4xl mb-2">🛍️</span>
                                <p className="text-sm font-medium">אין פריטים בקטגוריה זו</p>
                            </div>
                        ) : (
                            filteredItems.map((item) => {
                                const isEquipped = localState[item.type] === item.id;
                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        whileTap={{ scale: 0.93 }}
                                        onClick={() => handleSelect(item)}
                                        className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 cursor-pointer transition-all ${isEquipped
                                            ? 'border-pink-400 bg-pink-50 shadow-md'
                                            : 'border-slate-100 bg-slate-50 hover:border-pink-200'
                                            }`}
                                    >
                                        <img src={item.image} alt={item.name} className="w-3/4 h-3/4 object-contain" />
                                        <p className="text-[9px] text-gray-500 font-medium mt-1 text-center leading-tight">{item.name}</p>

                                        {/* Equipped badge */}
                                        {isEquipped && item.id !== 'none' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-sm"
                                            >
                                                <Check size={10} className="text-white" />
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MobileContainer>
    );
};
