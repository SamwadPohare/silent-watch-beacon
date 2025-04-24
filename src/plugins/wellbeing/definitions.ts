
export interface WellbeingPlugin {
  getScreenTime(): Promise<{ 
    totalMinutes: number;
    appUsage: Array<{
      packageName: string;
      minutes: number;
    }>;
  }>;
}

