
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './theme/ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

interface MainNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-black py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">VayaSpace</Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/memories" className="text-white hover:text-gray-300">{t('memories')}</Link>
          <Link to="/family-setup" className="text-white hover:text-gray-300">{t('family')}</Link>
          <Link to="/stories" className="text-white hover:text-gray-300">{t('stories')}</Link>
          <Link to="/settings" className="text-white hover:text-gray-300">{t('settings')}</Link>
          <Link to="/account" className="text-white hover:text-gray-300">{t('account')}</Link>
          <ThemeToggle variant="icon" className="text-white" />
        </div>
        
        <div className="md:hidden">
          <button className="text-white">{t('menu')}</button>
        </div>
      </div>
    </div>
  );
}
