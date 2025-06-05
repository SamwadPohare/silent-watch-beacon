
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import Logo from "@/components/ui/logo";

const Header = () => {
  return (
    <header className="bg-white border-b border-border py-3 px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <NavMenu />
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Logo size="md" className="text-primary" />
          <span className="text-primary">Patronus</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
          <Link to="/notifications">
            <Bell size={20} />
            <span className="sr-only">Notifications</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
