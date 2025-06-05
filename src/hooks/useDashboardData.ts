
import { useState } from "react";
import { WellnessMetric, TimelineItem } from "@/types";
import { Activity, BookOpen, BrainCircuit, MessageSquare, FileText, Users } from "lucide-react";

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
      title: "Social Engagement",
      value: 72,
      description: "Interactions and communications",
      status: "normal"
    },
    {
      id: "4",
      title: "Academic Engagement",
      value: 45,
      description: "Class attendance and participation",
      status: "critical"
    },
    {
      id: "5",
      title: "Message Response Time",
      value: 82,
      description: "How quickly you respond to messages",
      status: "normal"
    },
    {
      id: "6",
      title: "Screen Time",
      value: 64,
      description: "Daily device usage patterns",
      status: "warning"
    },
    {
      id: "7",
      title: "Leave Applications",
      value: 3,
      description: "Submit and track leave requests",
      status: "normal"
    },
    {
      id: "8",
      title: "Available Counselors",
      value: 4,
      description: "Total counselors available",
      status: "normal"
    }
  ]);

  const [activityItems] = useState<TimelineItem[]>([
    {
      id: "1",
      title: "Missed class attendance",
      time: "Today, 9:30 AM",
      description: "No attendance recorded for CS301 lecture",
      status: "critical"
    },
    {
      id: "2",
      title: "Late night activity detected",
      time: "Yesterday, 2:15 AM",
      description: "Device activity detected during recommended sleep hours",
      status: "warning"
    },
    {
      id: "3",
      title: "Reduced social messaging",
      time: "2 days ago",
      description: "Significant decrease in social messaging activity",
      status: "warning"
    },
    {
      id: "4",
      title: "Normal activity patterns",
      time: "3 days ago",
      description: "Regular activity patterns detected throughout the day",
      status: "normal"
    }
  ]);

  const metricIcons = {
    "Activity Patterns": Activity,
    "Sleep Quality": Activity,
    "Social Engagement": MessageSquare,
    "Academic Engagement": BookOpen,
    "Message Response Time": MessageSquare,
    "Screen Time": BrainCircuit,
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
    { name: "Sleep", value: 68 },
    { name: "Social", value: 72 },
    { name: "Academic", value: 45 },
    { name: "Messaging", value: 82 },
    { name: "Screen Time", value: 64 }
  ];

  const weeklyReports = [
    {
      id: "report-1",
      title: "Weekly Mood Summary",
      date: "December 30 - January 5, 2025",
      description: "A complete overview of your mood patterns and emotional wellness for the past week",
      category: "Mood",
      status: "available"
    },
    {
      id: "report-2",
      title: "Voice Analysis Report",
      date: "December 30 - January 5, 2025",
      description: "Detailed analysis of your voice recordings and emotional tone patterns",
      category: "Voice",
      status: "available"
    },
    {
      id: "report-3",
      title: "Mood Trend Analysis",
      date: "December 30 - January 5, 2025",
      description: "Weekly trends and patterns in your emotional wellness journey",
      category: "Trends",
      status: "available"
    }
  ];

  const monthlyReports = [
    {
      id: "report-4",
      title: "Monthly Mood Analytics",
      date: "December 2024",
      description: "Comprehensive monthly analysis of your mood patterns, including emoji trends and voice note insights",
      category: "Mood",
      status: "available"
    },
    {
      id: "report-5",
      title: "Emotional Wellness Summary",
      date: "December 2024",
      description: "Complete overview of your emotional wellness journey with voice analysis and mood correlations",
      category: "Wellness",
      status: "available"
    },
    {
      id: "report-6",
      title: "Support Network Impact",
      date: "December 2024",
      description: "Analysis of trusted contact interactions and support system effectiveness",
      category: "Support",
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
