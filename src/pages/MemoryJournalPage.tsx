
import React, { useState } from 'react';
import { AidaLayout } from '@/components/layout/AidaLayout';
import { MemoryJournal } from '@/components/memory/MemoryJournal';
import { useNavigate } from 'react-router-dom';

export const MemoryJournalPage = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleNext = () => {
    navigate('/memory-complete');
  };
  
  return (
    <AidaLayout withPadding={false} className="flex flex-col h-screen">
      <MemoryJournal 
        question="What's your earliest childhood memory?"
        onBack={handleBack}
        onNext={handleNext}
      />
    </AidaLayout>
  );
};
