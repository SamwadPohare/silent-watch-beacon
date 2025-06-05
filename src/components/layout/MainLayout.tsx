
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import WellnessChatbot from "../chatbot/WellnessChatbot";
import { useBackButton } from "@/hooks/useBackButton";

const MainLayout = () => {
  useBackButton();

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <WellnessChatbot />
    </div>
  );
};

export default MainLayout;
