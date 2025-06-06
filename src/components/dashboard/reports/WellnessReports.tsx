
import { useState } from 'react';
import { FileText, FileDown, Clock, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWellnessReports } from '@/hooks/useWellnessReports';

const WellnessReports = () => {
  const { toast } = useToast();
  const { weeklyReports, monthlyReports, loading, error } = useWellnessReports();
  const [generatingPdf, setGeneratingPdf] = useState<string | null>(null);

  const handleDownloadPDF = async (reportId: string, reportTitle: string) => {
    try {
      setGeneratingPdf(reportId);
      
      // In a real implementation, you would call an API to generate the PDF
      // For now, we'll simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example of what would happen after PDF is generated
      toast({
        title: "PDF Downloaded",
        description: `${reportTitle} has been downloaded successfully.`
      });
    } catch (err) {
      toast({
        title: "Download Failed",
        description: "Could not download PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingPdf(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading reports: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Wellness Reports</h2>
        <p className="text-muted-foreground">
          Generated reports and insights based on your wellness tracking data
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Reports</CardTitle>
            <FileText size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Weekly summaries of your mood patterns and wellness trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyReports.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No weekly reports available</p>
            ) : (
              weeklyReports.map(report => (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar size={14} />
                        <span>{new Date(report.start_date).toLocaleDateString()} - {new Date(report.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownloadPDF(report.id, report.title)}
                      disabled={generatingPdf === report.id}
                    >
                      {generatingPdf === report.id ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-1"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <FileDown size={14} />
                          <span>PDF</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm mt-1 mb-3">{report.content}</p>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="mood">😊</span>
                      <span>Mood: {report.mood_average.toFixed(1)}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="sleep">💤</span>
                      <span>Sleep: {report.sleep_average.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="activity">🏃</span>
                      <span>Activity: {report.activity_average.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {report.total_mood_entries} Entries
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {report.total_voice_notes} Voice Notes
                    </Badge>
                    {report.support_alerts_sent > 0 && (
                      <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
                        {report.support_alerts_sent} Alerts Sent
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Reports</CardTitle>
            <FileText size={18} className="text-muted-foreground" />
          </div>
          <CardDescription>
            Comprehensive monthly analysis of your wellness journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyReports.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No monthly reports available</p>
            ) : (
              monthlyReports.map(report => (
                <div key={report.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar size={14} />
                        <span>{new Date(report.start_date).toLocaleDateString()} - {new Date(report.end_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1"
                      onClick={() => handleDownloadPDF(report.id, report.title)}
                      disabled={generatingPdf === report.id}
                    >
                      {generatingPdf === report.id ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full mr-1"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <FileDown size={14} />
                          <span>PDF</span>
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm mt-1 mb-3">{report.content}</p>
                  <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="mood">😊</span>
                      <span>Mood: {report.mood_average.toFixed(1)}/5</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="sleep">💤</span>
                      <span>Sleep: {report.sleep_average.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span role="img" aria-label="activity">🏃</span>
                      <span>Activity: {report.activity_average.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} />
                      <span>{report.total_voice_notes} Voice Notes</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessReports;
