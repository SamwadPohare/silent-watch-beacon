
import { Activity, BookOpen, BrainCircuit, Calendar, Clock, MessageSquare, FileText, FileChart } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MetricsCard from "@/components/dashboard/MetricsCard";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import { WellnessMetric, TimelineItem } from "@/types";
import MetricBarChart from "@/components/charts/MetricBarChart";
import MetricLineChart from "@/components/charts/MetricLineChart";

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

  // Chart data for detailed metrics
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

  // Wellness report data
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
        
        <TabsContent value="metrics" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Detailed Metrics</h2>
            <p className="text-muted-foreground">
              Comprehensive view of all your wellness data and trends
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <MetricLineChart 
              data={weeklyTrends}
              title="Weekly Wellness Score Trend"
              description="Your overall wellness score over the past week"
            />
            <MetricBarChart 
              data={categoryDistribution}
              title="Wellness Categories Distribution"
              description="Breakdown of your wellness metrics by category"
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Overall Wellness Score</CardTitle>
                  <Activity size={18} className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74%</div>
                <CardDescription className="mt-1">Average of all wellness metrics</CardDescription>
                <p className="mt-2 text-sm font-medium text-green-600">+3% from last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
                  <Activity size={18} className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Activity Patterns</div>
                <CardDescription className="mt-1">Your strongest wellness area</CardDescription>
                <p className="mt-2 text-sm font-medium text-green-600">85%</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Needs Improvement</CardTitle>
                  <BookOpen size={18} className="text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Academic Engagement</div>
                <CardDescription className="mt-1">Area requiring attention</CardDescription>
                <p className="mt-2 text-sm font-medium text-red-600">45%</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Metric Correlations</CardTitle>
              <CardDescription>
                Relationships between different wellness metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Findings:</p>
                  <ul className="text-sm text-muted-foreground space-y-1.5 pl-4">
                    <li><span className="font-medium">Sleep Quality and Academic Engagement</span> - Strong positive correlation (0.82)</li>
                    <li><span className="font-medium">Screen Time and Sleep Quality</span> - Moderate negative correlation (-0.65)</li>
                    <li><span className="font-medium">Social Engagement and Message Response Time</span> - Strong positive correlation (0.78)</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium">Insights:</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your data suggests that improving sleep quality could significantly boost academic performance.
                    Reducing late-night screen time may help improve your sleep patterns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Wellness Reports</h2>
            <p className="text-muted-foreground">
              Generated reports and insights based on your wellness data
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Reports</CardTitle>
                <FileText size={18} className="text-muted-foreground" />
              </div>
              <CardDescription>
                Reports generated for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyReports.map(report => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                        <p className="text-sm mt-1">{report.description}</p>
                      </div>
                      <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                        {report.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Reports</CardTitle>
                <FileChart size={18} className="text-muted-foreground" />
              </div>
              <CardDescription>
                Monthly summary reports and analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyReports.map(report => (
                  <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                        <p className="text-sm mt-1">{report.description}</p>
                      </div>
                      <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
                        {report.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Custom Reports</CardTitle>
              <CardDescription>
                Generate personalized reports based on specific criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <FileText size={36} className="mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">Generate Custom Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create a personalized report by selecting specific metrics, time periods, and formats
                </p>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Create New Report
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
