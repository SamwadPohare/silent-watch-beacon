
import { Activity, BookOpen, BrainCircuit, Calendar, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsCard from "@/components/dashboard/MetricsCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { WellnessMetric, TimelineItem } from "@/types";

const Dashboard = () => {
  // Mock data for wellness metrics
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

  // Mock data for activity timeline
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

  // Icons map for metrics
  const metricIcons = {
    "Activity Patterns": <Activity size={18} />,
    "Sleep Quality": <Clock size={18} />,
    "Social Engagement": <MessageSquare size={18} />,
    "Academic Engagement": <BookOpen size={18} />,
    "Message Response Time": <MessageSquare size={18} />,
    "Screen Time": <BrainCircuit size={18} />
  };

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
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricsCard
                key={metric.id}
                title={metric.title}
                value={metric.value}
                description={metric.description}
                status={metric.status}
                icon={metricIcons[metric.title as keyof typeof metricIcons]}
              />
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <ActivityTimeline items={activityItems} />
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Weekly Summary</CardTitle>
                  <Calendar size={18} className="text-muted-foreground" />
                </div>
                <CardDescription>
                  Your wellness overview for the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Insights:</p>
                    <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                      <li>Academic engagement has decreased by 15%</li>
                      <li>Sleep patterns show irregular hours</li>
                      <li>Social interactions have remained stable</li>
                    </ul>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm font-medium">Recommendations:</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider establishing a consistent sleep schedule and reach out to your academic advisor for support with course engagement.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Metrics</CardTitle>
              <CardDescription>
                Comprehensive view of all your wellness data and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed metrics visualization will be available here. This section will provide in-depth analysis of your wellness patterns over time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Reports</CardTitle>
              <CardDescription>
                Generated reports and insights based on your wellness data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Wellness reports will be available here. This section will provide downloadable reports and personalized insights based on your collected data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
