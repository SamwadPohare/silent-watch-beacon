import { useState } from "react";
import { Activity, BookOpen, BrainCircuit, MessageSquare } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WellnessMetric, TimelineItem } from "@/types";
import DashboardOverview from "@/components/dashboard/overview/DashboardOverview";
import DashboardMetrics from "@/components/dashboard/metrics/DashboardMetrics";
import DashboardReports from "@/components/dashboard/reports/DashboardReports";

const Dashboard = () => {
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
    "Activity Patterns": <Activity size={18} />,
    "Sleep Quality": <Activity size={18} />,
    "Social Engagement": <MessageSquare size={18} />,
    "Academic Engagement": <BookOpen size={18} />,
    "Message Response Time": <MessageSquare size={18} />,
    "Screen Time": <BrainCircuit size={18} />
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
      title: "Weekly Wellness Summary",
      date: "April 16-22, 2025",
      description: "A complete overview of your wellness metrics for the past week",
      category: "Summary",
      status: "available"
    },
    {
      id: "report-2",
      title: "Sleep Pattern Analysis",
      date: "April 16-22, 2025",
      description: "Detailed analysis of your sleep patterns and recommendations",
      category: "Sleep",
      status: "available"
    },
    {
      id: "report-3",
      title: "Academic Performance",
      date: "April 16-22, 2025",
      description: "Analysis of your academic engagement and attendance",
      category: "Academic",
      status: "available"
    },
    {
      id: "report-4",
      title: "Social Interaction Patterns",
      date: "April 16-22, 2025",
      description: "Overview of your social engagement and communication habits",
      category: "Social",
      status: "available"
    }
  ];

  const monthlyReports = [
    {
      id: "report-5",
      title: "Monthly Wellness Summary",
      date: "April 2025",
      description: "A comprehensive overview of your wellness metrics for the month",
      category: "Summary",
      status: "available"
    },
    {
      id: "report-6",
      title: "Monthly Screen Time Analysis",
      date: "April 2025",
      description: "Detailed analysis of your screen time and digital habits",
      category: "Screen Time",
      status: "available"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Wellness Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your wellness patterns and stay informed about potential concerns.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardOverview 
            metrics={metrics}
            activityItems={activityItems}
            metricIcons={metricIcons}
          />
        </TabsContent>
        
        <TabsContent value="metrics">
          <DashboardMetrics
            weeklyTrends={weeklyTrends}
            categoryDistribution={categoryDistribution}
          />
        </TabsContent>
        
        <TabsContent value="reports">
          <DashboardReports
            weeklyReports={weeklyReports}
            monthlyReports={monthlyReports}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
