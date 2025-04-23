
import LeaveApplicationCard from "@/components/dashboard/leave/LeaveApplicationCard";

const LeaveApplications = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leave Applications</h1>
        <p className="text-muted-foreground">Submit and manage your leave requests</p>
      </div>
      <div className="max-w-md">
        <LeaveApplicationCard />
      </div>
    </div>
  );
};

export default LeaveApplications;
