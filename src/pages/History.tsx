import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MoodDay = "bien" | "regular" | "mal" | null;

// Mock data for the calendar
const mockData: Record<string, MoodDay> = {
  "2026-02-01": "bien", "2026-02-02": "bien", "2026-02-03": "regular",
  "2026-02-04": "bien", "2026-02-05": "mal", "2026-02-06": "regular",
  "2026-02-07": "bien", "2026-02-08": "bien", "2026-02-09": "bien",
  "2026-02-10": "regular", "2026-02-11": "bien", "2026-02-12": "mal",
  "2026-02-13": "bien", "2026-02-14": "regular", "2026-02-15": "bien",
  "2026-02-16": "bien", "2026-02-17": "regular", "2026-02-18": "bien",
  "2026-02-19": "bien", "2026-02-20": "regular", "2026-02-21": "bien",
  "2026-02-22": "bien", "2026-02-23": "regular", "2026-02-24": "bien",
  "2026-02-25": "bien",
};

const moodColors: Record<string, string> = {
  bien: "bg-success",
  regular: "bg-warning",
  mal: "bg-danger",
};

const weekChartData = [
  { day: "L", sleep: 7.5, steps: 8200 },
  { day: "M", sleep: 6.0, steps: 5400 },
  { day: "X", sleep: 8.0, steps: 9100 },
  { day: "J", sleep: 7.0, steps: 6800 },
  { day: "V", sleep: 7.5, steps: 7300 },
  { day: "S", sleep: 9.0, steps: 4200 },
  { day: "D", sleep: 8.5, steps: 3100 },
];

const History = () => {
  const [currentMonth] = useState(new Date(2026, 1)); // Feb 2026
  const [selectedTab, setSelectedTab] = useState<"7" | "30" | "90">("7");

  const monthName = currentMonth.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  // Generate calendar days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Monday start

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const maxSteps = Math.max(...weekChartData.map(d => d.steps));

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="px-5 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-foreground">Mi Progreso</h1>
        <p className="text-sm text-muted-foreground mt-1">Visualiza tu historial de salud</p>
      </header>

      <div className="px-5 space-y-6">
        {/* Calendar */}
        <div className="bg-card rounded-2xl p-5 card-shadow animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <ChevronLeft size={16} />
            </button>
            <h3 className="text-base font-bold text-foreground capitalize">{monthName}</h3>
            <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
              <div key={d} className="text-center text-[11px] font-semibold text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const mood = mockData[dateStr];
              const isToday = day === 25;

              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                    mood
                      ? `${moodColors[mood]} text-primary-foreground`
                      : "bg-muted text-muted-foreground"
                  } ${isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {[
              { label: "Bien", color: "bg-success" },
              { label: "Regular", color: "bg-warning" },
              { label: "Mal", color: "bg-danger" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${color}`} />
                <span className="text-[11px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Period selector */}
        <div className="flex bg-muted rounded-xl p-1">
          {(["7", "30", "90"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                selectedTab === tab
                  ? "bg-card text-foreground card-shadow"
                  : "text-muted-foreground"
              }`}
            >
              {tab} días
            </button>
          ))}
        </div>

        {/* Simple bar chart */}
        <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up">
          <h3 className="text-sm font-semibold text-foreground mb-4">Pasos diarios</h3>
          <div className="flex items-end gap-2 h-32">
            {weekChartData.map(({ day, steps }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">
                  {(steps / 1000).toFixed(1)}k
                </span>
                <div className="w-full rounded-t-lg health-gradient transition-all duration-500"
                  style={{ height: `${(steps / maxSteps) * 100}%` }}
                />
                <span className="text-[11px] text-muted-foreground font-semibold">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sleep chart */}
        <div className="bg-card rounded-2xl p-5 card-shadow animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Horas de sueño</h3>
          <div className="flex items-end gap-2 h-32">
            {weekChartData.map(({ day, sleep }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground font-medium">{sleep}h</span>
                <div className="w-full rounded-t-lg bg-primary/70 transition-all duration-500"
                  style={{ height: `${(sleep / 10) * 100}%` }}
                />
                <span className="text-[11px] text-muted-foreground font-semibold">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
