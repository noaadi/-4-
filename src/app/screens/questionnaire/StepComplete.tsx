import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MobileContainer } from '../../components/MobileContainer';
import { Button } from '../../components/ui';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export const StepComplete = () => {
  const navigate = useNavigate();
  const { t } = useApp();

  return (
    <MobileContainer className="p-8 items-center justify-center space-y-12 bg-pink-50">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5 }}
        className="flex flex-col items-center space-y-6"
      >
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
           <CheckCircle size={64} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 text-center">{t('allSet')}</h1>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-xs"
      >
        <Button 
          fullWidth 
          variant="primary"
          onClick={() => navigate('/main')}
          className="h-16 text-xl shadow-lg"
        >
          {t('letsGetStarted')}
        </Button>
      </motion.div>
    </MobileContainer>
  );
};
