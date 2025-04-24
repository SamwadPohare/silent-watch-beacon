
export interface WellbeingPlugin {
  checkPermission(): Promise<{ hasPermission: boolean }>;
  requestPermission(): Promise<{ opened: boolean }>;
  getScreenTime(): Promise<{ 
    totalMinutes: number;
    appUsage: Array<{
      packageName: string;
      minutes: number;
      lastTimeUsed: number;
      totalTimeInForeground: number;
    }>;
    error?: string;
  }>;
}
