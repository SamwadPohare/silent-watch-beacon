
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface Counselor {
  id: string;
  name: string;
  phone: string;
  email: string;
  specialization: string | null;
  available_hours: string | null;
}

const CounselorList = () => {
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      const { data, error } = await supabase
        .from("counselors")
        .select("*")
        .order("name");

      if (!error && data) {
        setCounselors(data);
      }
      setLoading(false);
    };

    fetchCounselors();
  }, []);

  if (loading) {
    return <div>Loading counselors...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Counselors</CardTitle>
        <CardDescription>Contact information for school counselors</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Available Hours</TableHead>
              <TableHead>Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {counselors.map((counselor) => (
              <TableRow key={counselor.id}>
                <TableCell className="font-medium">{counselor.name}</TableCell>
                <TableCell>{counselor.specialization || "General"}</TableCell>
                <TableCell>{counselor.available_hours || "Contact for hours"}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{counselor.email}</div>
                    <div>{counselor.phone}</div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CounselorList;
