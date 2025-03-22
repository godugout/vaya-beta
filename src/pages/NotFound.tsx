
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h1 className="text-6xl font-bold text-autumn dark:text-leaf mb-6">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => navigate('/')}
          className="bg-autumn hover:bg-autumn/90 text-white dark:bg-leaf dark:text-black dark:hover:bg-leaf/90"
        >
          Go to Home
        </Button>
        <Button 
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-autumn text-autumn hover:bg-autumn/10 dark:border-leaf dark:text-leaf dark:hover:bg-leaf/10"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
