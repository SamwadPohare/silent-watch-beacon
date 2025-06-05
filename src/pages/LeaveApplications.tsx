
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

const LeaveApplications = () => {
  const recentApplications = [
    { id: 1, type: "Medical Leave", status: "Approved", date: "2025-04-20", duration: "3 days" },
    { id: 2, type: "Personal Leave", status: "Pending", date: "2025-04-18", duration: "1 day" },
    { id: 3, type: "Emergency Leave", status: "Rejected", date: "2025-04-15", duration: "2 days" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 p-4 pb-20 max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Leave Applications</h1>
      </div>

      <div className="space-y-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Submit New Application</CardTitle>
            <CardDescription>Apply for leave quickly and easily</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              New Leave Application
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Application Status</CardTitle>
            <CardDescription>Current applications overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <p className="text-2xl font-bold text-green-600">2</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-red-600">1</p>
                <p className="text-xs text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <CardDescription>Your latest leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="border-b last:border-b-0 pb-3 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{application.type}</p>
                      <p className="text-xs text-muted-foreground">{application.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(application.status)}
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{application.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              View All Applications
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Check Leave Balance
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeaveApplications;
