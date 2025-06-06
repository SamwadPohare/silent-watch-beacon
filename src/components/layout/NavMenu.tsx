
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, Users, Bell, User, Settings, BellRing } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/logo";

const NAV_ITEMS = [
  { name: "Dashboard", to: "/", icon: Home },
  { name: "Contacts", to: "/contacts", icon: Users },
  { name: "Alerts", to: "/alerts", icon: Bell },
  { name: "Notifications", to: "/notifications", icon: BellRing },
  { name: "Profile", to: "/profile", icon: User },
  { name: "Settings", to: "/settings", icon: Settings },
];

export default function NavMenu() {
  const location = useLocation();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu size={24} />
          <span className="sr-only">Open Navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-4">
          <SheetTitle className="flex items-center gap-2">
            <Logo size="md" className="text-primary" />
            <span className="text-primary">Patronus</span>
          </SheetTitle>
          <p className="text-xs text-muted-foreground mt-1">Student Wellness Monitoring</p>
        </SheetHeader>
        <nav className="flex flex-col gap-1 mt-4">
          {NAV_ITEMS.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
