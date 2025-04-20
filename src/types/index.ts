
// Wellness metrics types
export interface WellnessMetric {
  id: string;
  title: string;
  value: number;
  description: string;
  status: "normal" | "warning" | "critical";
}

// Contact types
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relation: string;
  isActive: boolean;
}

// Activity timeline types
export interface TimelineItem {
  id: string;
  title: string;
  time: string;
  description: string;
  status: "normal" | "warning" | "critical";
}

// Alert types
export interface Alert {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high";
  isRead: boolean;
}

// User settings types
export interface UserSettings {
  monitoringEnabled: boolean;
  dataSharingEnabled: boolean;
  alertThreshold: number;
  notificationsEnabled: boolean;
  autoReportGeneration: boolean;
}
