
import LeaveApplicationForm from "@/components/leave/LeaveApplicationForm";
import CounselorList from "@/components/counselors/CounselorList";

const LeaveApplication = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Leave Application</h1>
        <p className="text-muted-foreground">
          Submit your leave request and find counselor contact information
        </p>
      </div>

      <div className="grid gap-6">
        <LeaveApplicationForm />
        <CounselorList />
      </div>
    </div>
  );
};

export default LeaveApplication;
