import { Footprints, Moon, Heart } from "lucide-react";

const metrics = [
  { icon: Footprints, label: "Pasos", value: "6,234", target: "10,000", percent: 62 },
  { icon: Moon, label: "Sueño", value: "7.2h", target: "8h", percent: 90 },
  { icon: Heart, label: "FC", value: "72", target: "bpm", percent: 100 },
];

const DailySummary = () => {
  return (
    <div className="grid grid-cols-3 gap-3 animate-slide-up">
      {metrics.map(({ icon: Icon, label, value, target, percent }) => (
        <div
          key={label}
          className="bg-card rounded-2xl p-4 card-shadow flex flex-col items-center gap-2"
        >
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <Icon size={20} className="text-primary" />
          </div>
          <span className="text-lg font-bold text-foreground">{value}</span>
          <span className="text-[11px] text-muted-foreground font-medium">{target}</span>
          {/* Mini progress bar */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full health-gradient transition-all duration-700"
              style={{ width: `${Math.min(percent, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailySummary;
