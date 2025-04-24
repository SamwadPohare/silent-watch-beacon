
import { Device } from '@capacitor/device';
import { Wellbeing } from '../plugins/wellbeing';

export interface ScreenTimeData {
  totalUsage: number; // in minutes
  appUsage: Array<{appName: string, duration: number}>;
  timeOfDay: string;
  date: string;
}

export class DeviceWellbeingService {
  static async getScreenTimeData(): Promise<ScreenTimeData> {
    try {
      // Get device info to check platform
      const info = await Device.getInfo();
      console.log('Device platform:', info.platform);
      
      // Try to get actual device data if available
      try {
        const wellbeingData = await Wellbeing.getScreenTime();
        
        return {
          totalUsage: wellbeingData.totalMinutes,
          appUsage: wellbeingData.appUsage.map(app => ({
            appName: app.packageName,
            duration: app.minutes
          })),
          timeOfDay: "All day",
          date: new Date().toISOString().split('T')[0]
        };
      } catch (wellbeingError) {
        console.warn('Wellbeing plugin not available, using mock data:', wellbeingError);
        
        // Fallback to mock data if plugin isn't available
        return {
          totalUsage: 270, // 4.5 hours
          appUsage: [
            { appName: "Social Media", duration: 95 },
            { appName: "Educational", duration: 75 },
            { appName: "Entertainment", duration: 60 },
            { appName: "Productivity", duration: 40 }
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

