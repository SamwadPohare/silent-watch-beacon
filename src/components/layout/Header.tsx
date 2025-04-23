
import { Bell, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header className="bg-white border-b border-border py-3 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <NavMenu />
        <Link to="/" className="font-semibold text-lg">
          <span className="text-primary">Silent</span>Watch
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/notifications">
            <Bell size={20} />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/settings">
            <Settings size={20} />
            <span className="sr-only">Settings</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/profile">
            <User size={20} />
            <span className="sr-only">Profile</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
