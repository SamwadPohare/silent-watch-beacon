
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="lg:w-1/3">
          <CardHeader>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={40} className="text-primary" />
              </div>
              <CardTitle className="mt-4">Alex Johnson</CardTitle>
              <CardDescription>Student ID: 3476891</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">Active Student</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Department:</span>
                <span className="font-medium">Computer Science</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Enrollment:</span>
                <span className="font-medium">Fall 2022</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-medium">Student</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Export My Data</Button>
          </CardFooter>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="Alex" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Johnson" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="alex.johnson@university.edu" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="academic" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>
                    View and update your academic details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Student ID</Label>
                    <Input disabled defaultValue="3476891" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Department</Label>
                    <Input disabled defaultValue="Computer Science" />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Course Schedule</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>CS301: Data Structures</span>
                        <span className="text-muted-foreground">MWF 9:30 AM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>CS405: Machine Learning</span>
                        <span className="text-muted-foreground">TTh 1:00 PM</span>
                      </li>
                      <li className="flex justify-between">
                        <span>MATH202: Linear Algebra</span>
                        <span className="text-muted-foreground">MWF 2:15 PM</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                    Delete Account
                  </Button>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
