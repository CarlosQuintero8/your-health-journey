import MoodSelector from "@/components/MoodSelector";
import DailySummary from "@/components/DailySummary";
import WeeklyTrend from "@/components/WeeklyTrend";
import ConsistencyRing from "@/components/ConsistencyRing";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="health-gradient px-5 pt-12 pb-8 rounded-b-[2rem]">
        <p className="text-primary-foreground/70 text-sm font-medium capitalize">{today}</p>
        <h1 className="text-2xl font-bold text-primary-foreground mt-1">Hi, how are you? 👋</h1>
      </header>

      <div className="px-5 -mt-4 space-y-6">
        <div className="bg-card rounded-2xl p-5 card-shadow-lg">
          <MoodSelector />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Today's Summary
          </h3>
          <DailySummary />
        </div>

        <ConsistencyRing />
        <WeeklyTrend />
      </div>

      <button
        onClick={() => navigate("/registro")}
        className="fixed bottom-20 right-5 w-14 h-14 rounded-full health-gradient text-primary-foreground flex items-center justify-center card-shadow-lg hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <Plus size={26} />
      </button>
    </div>
  );
};

export default Index;
