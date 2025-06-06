
import { useState } from "react";
import { WellnessMetric, TimelineItem } from "@/types";
import { Activity, Users, FileText } from "lucide-react";

export const useDashboardData = () => {
  const [metrics] = useState<WellnessMetric[]>([
    {
      id: "1",
      title: "Activity Patterns",
      value: 85,
      description: "Daily activity and movement",
      status: "normal"
    },
    {
      id: "2",
      title: "Sleep Quality",
      value: 68,
      description: "Sleep duration and patterns",
      status: "warning"
    },
    {
      id: "3",
      title: "Leave Applications",
      value: 3,
      description: "Submit and track leave requests",
      status: "normal"
    },
    {
      id: "4",
      title: "Available Counselors",
      value: 4,
      description: "Total counselors available",
      status: "normal"
    }
  ]);

  const [activityItems] = useState<TimelineItem[]>([
    {
      id: "1",
      title: "Good sleep pattern detected",
      time: "Today, 7:30 AM",
      description: "Consistent 8-hour sleep recorded for the past 3 days",
      status: "normal"
    },
    {
      id: "2",
      title: "High activity levels",
      time: "Yesterday, 6:00 PM",
      description: "Physical activity exceeded daily target by 20%",
      status: "normal"
    },
    {
      id: "3",
      title: "Late bedtime detected",
      time: "2 days ago, 11:45 PM",
      description: "Sleep time was 2 hours later than usual",
      status: "warning"
    },
    {
      id: "4",
      title: "Regular activity patterns",
      time: "3 days ago",
      description: "Maintained consistent daily routine and activity levels",
      status: "normal"
    }
  ]);

  const metricIcons = {
    "Activity Patterns": Activity,
    "Sleep Quality": Activity,
    "Leave Applications": FileText,
    "Available Counselors": Users
  };

  const weeklyTrends = [
    { name: "Mon", value: 75 },
    { name: "Tue", value: 68 },
    { name: "Wed", value: 82 },
    { name: "Thu", value: 79 },
    { name: "Fri", value: 85 },
    { name: "Sat", value: 76 },
    { name: "Sun", value: 80 }
  ];

  const categoryDistribution = [
    { name: "Activity", value: 85 },
    { name: "Sleep", value: 68 }
  ];

  const weeklyReports = [
    {
      id: "report-1",
      title: "Weekly Wellness Summary",
      date: "December 30 - January 5, 2025",
      description: "Comprehensive overview of your wellness patterns including sleep and activity data",
      category: "Wellness",
      status: "available"
    },
    {
      id: "report-2",
      title: "Sleep Pattern Analysis",
      date: "December 30 - January 5, 2025",
      description: "Detailed analysis of your sleep quality, duration, and consistency patterns",
      category: "Sleep",
      status: "available"
    },
    {
      id: "report-3",
      title: "Activity Trend Report",
      date: "December 30 - January 5, 2025",
      description: "Weekly analysis of your physical activity levels and movement patterns",
      category: "Activity",
      status: "available"
    }
  ];

  const monthlyReports = [
    {
      id: "report-4",
      title: "Monthly Wellness Analytics",
      date: "December 2024",
      description: "Complete monthly analysis of wellness patterns including sleep quality and activity trends",
      category: "Wellness",
      status: "available"
    },
    {
      id: "report-5",
      title: "Sleep Quality Assessment",
      date: "December 2024",
      description: "Comprehensive monthly sleep analysis with recommendations for improvement",
      category: "Sleep",
      status: "available"
    },
    {
      id: "report-6",
      title: "Physical Activity Summary",
      date: "December 2024",
      description: "Monthly overview of physical activity patterns and fitness progress",
      category: "Activity",
      status: "available"
    }
  ];

  return {
    metrics,
    activityItems,
    metricIcons,
    weeklyTrends,
    categoryDistribution,
    weeklyReports,
    monthlyReports
  };
};
