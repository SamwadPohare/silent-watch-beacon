import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

export const useBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBackButton = () => {
      // If we're on the dashboard/home page, allow the app to close
      if (location.pathname === '/') {
        App.exitApp();
        return;
      }
      
      // Otherwise, navigate back in the browser history
      navigate(-1);
    };

    // Listen for the hardware back button on mobile
    const backButtonListener = App.addListener('backButton', handleBackButton);

    return () => {
      backButtonListener.remove();
    };
  }, [navigate, location.pathname]);
};
