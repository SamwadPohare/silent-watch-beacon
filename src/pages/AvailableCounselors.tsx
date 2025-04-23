
import CounselorOverviewCard from "@/components/dashboard/counselors/CounselorOverviewCard";

const AvailableCounselors = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Available Counselors</h1>
        <p className="text-muted-foreground">Find and connect with counselors</p>
      </div>
      <div className="max-w-md">
        <CounselorOverviewCard />
      </div>
    </div>
  );
};

export default AvailableCounselors;
