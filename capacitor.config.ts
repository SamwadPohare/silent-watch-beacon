
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2ba213b67fad4517b0d183dc8cf52100',
  appName: 'Patronus',
  webDir: 'dist',
  server: {
    url: 'https://2ba213b6-7fad-4517-b0d1-83dc8cf52100.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    App: {
      backButtonStyle: 'none'
    }
  }
};

export default config;
