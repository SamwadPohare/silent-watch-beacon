
import { Bell, Home, Settings, User, Users, FileText, BellRing } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/components/ui/logo";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      href: "/",
      active: location.pathname === "/"
    },
    {
      name: "Contacts",
      icon: <Users size={20} />,
      href: "/contacts",
      active: location.pathname === "/contacts"
    },
    {
      name: "Alerts",
      icon: <Bell size={20} />,
      href: "/alerts",
      active: location.pathname === "/alerts"
    },
    {
      name: "Notifications",
      icon: <BellRing size={20} />,
      href: "/notifications",
      active: location.pathname === "/notifications"
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      href: "/profile",
      active: location.pathname === "/profile"
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      href: "/settings",
      active: location.pathname === "/settings"
    },
    {
      name: "Leave Application",
      icon: <FileText size={20} />,
      href: "/leave-application",
      active: location.pathname === "/leave-application"
    }
  ];

  return (
    <aside className="h-screen w-64 border-r border-border bg-white sticky top-0 py-6 px-3 overflow-y-auto">
      <div className="flex flex-col gap-1">
        <div className="px-4 py-2 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Logo size="lg" className="text-primary" />
            <h1 className="font-bold text-xl text-primary">Patronus</h1>
          </div>
          <p className="text-xs text-muted-foreground">Student Wellness Monitoring</p>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
