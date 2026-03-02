import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { QuestionLayout } from './QuestionLayout';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui';

export const StepMilitary = () => {
  const navigate = useNavigate();
  const { t, updateUserData, userData } = useApp();
  const [isMilitary, setIsMilitary] = useState<boolean | null>(userData.military || null);

  const handleNext = () => {
    if (isMilitary !== null) {
      updateUserData({ military: isMilitary });
      navigate('/questionnaire/complete');
    }
  };

  return (
    <QuestionLayout 
      title={t('militaryQuestion')} 
      onNext={handleNext}
      canNext={isMilitary !== null}
      showBack={true}
    >
      <div className="flex flex-col w-full space-y-4">
        <Button 
          variant={isMilitary === true ? 'primary' : 'secondary'}
          onClick={() => setIsMilitary(true)}
          className="h-20 text-xl font-medium"
          fullWidth
        >
          {t('yes')}
        </Button>
        <Button 
          variant={isMilitary === false ? 'primary' : 'secondary'}
          onClick={() => setIsMilitary(false)}
          className="h-20 text-xl font-medium"
          fullWidth
        >
          {t('no')}
        </Button>
      </div>
    </QuestionLayout>
  );
};
