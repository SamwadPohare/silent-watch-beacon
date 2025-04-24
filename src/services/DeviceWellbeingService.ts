
import { Device } from '@capacitor/device';
import { Wellbeing } from '../plugins/wellbeing';

export interface ScreenTimeData {
  totalUsage: number; // in minutes
  appUsage: Array<{
    appName: string;
    duration: number;
    lastUsed: Date;
    totalTimeInForeground: number;
  }>;
  timeOfDay: string;
  date: string;
  error?: 'permission_required' | 'system_error';
}

export class DeviceWellbeingService {
  static async checkPermission(): Promise<boolean> {
    try {
      const info = await Device.getInfo();
      if (info.platform !== 'android') {
        return true; // Skip permission check for non-Android platforms
      }
      
      const { hasPermission } = await Wellbeing.checkPermission();
      return hasPermission;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }

  static async requestPermission(): Promise<void> {
    try {
      const info = await Device.getInfo();
      if (info.platform === 'android') {
        await Wellbeing.requestPermission();
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      throw error;
    }
  }

  static async getScreenTimeData(): Promise<ScreenTimeData> {
    try {
      const info = await Device.getInfo();
      console.log('Device platform:', info.platform);
      
      try {
        const wellbeingData = await Wellbeing.getScreenTime();
        
        if (wellbeingData.error) {
          return {
            totalUsage: 0,
            appUsage: [],
            timeOfDay: "All day",
            date: new Date().toISOString().split('T')[0],
            error: wellbeingData.error
          };
        }
        
        return {
          totalUsage: wellbeingData.totalMinutes,
          appUsage: wellbeingData.appUsage.map(app => ({
            appName: app.appName || app.packageName,
            duration: app.minutes,
            lastUsed: new Date(app.lastTimeUsed),
            totalTimeInForeground: app.totalTimeInForeground
          })),
          timeOfDay: "All day",
          date: new Date().toISOString().split('T')[0]
        };
      } catch (wellbeingError) {
        console.warn('Wellbeing plugin not available, using mock data:', wellbeingError);
        
        // Fallback to mock data if plugin isn't available
        return {
          totalUsage: 270,
          appUsage: [
            { appName: "Social Media", duration: 95, lastUsed: new Date(), totalTimeInForeground: 5700000 },
            { appName: "Educational", duration: 75, lastUsed: new Date(), totalTimeInForeground: 4500000 },
            { appName: "Entertainment", duration: 60, lastUsed: new Date(), totalTimeInForeground: 3600000 },
            { appName: "Productivity", duration: 40, lastUsed: new Date(), totalTimeInForeground: 2400000 }
          ],
          timeOfDay: "All day",
          date: new Date().toISOString().split('T')[0]
        };
      }
    } catch (error) {
      console.error('Error getting device info:', error);
      throw error;
    }
  }
}
