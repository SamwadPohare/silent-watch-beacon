import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { App } from '@capacitor/app';

export const useBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let backButtonListener: any = null;

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
    const setupListener = async () => {
      try {
        backButtonListener = await App.addListener('backButton', handleBackButton);
      } catch (error) {
        console.log('Could not set up back button listener:', error);
      }
    };

    setupListener();

    return () => {
      if (backButtonListener) {
        backButtonListener.remove();
      }
    };
  }, [navigate, location.pathname]);
};
