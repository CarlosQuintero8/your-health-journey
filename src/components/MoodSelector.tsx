import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mood = "good" | "okay" | "bad";

const moods: { value: Mood; emoji: string; label: string; colorClass: string }[] = [
  { value: "good", emoji: "😊", label: "Good", colorClass: "bg-success text-success-foreground" },
  { value: "okay", emoji: "😐", label: "Okay", colorClass: "bg-warning text-warning-foreground" },
  { value: "bad", emoji: "😔", label: "Bad", colorClass: "bg-danger text-danger-foreground" },
];

interface MoodSelectorProps {
  onSelect?: (mood: Mood) => void;
}

const MoodSelector = ({ onSelect }: MoodSelectorProps) => {
  const [selected, setSelected] = useState<Mood | null>(null);
  const navigate = useNavigate();

  const handleSelect = (mood: Mood) => {
    setSelected(mood);
    onSelect?.(mood);
    setTimeout(() => navigate(`/registro?mood=${mood}`), 300);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold text-foreground text-center mb-6">
        How are you feeling today?
      </h2>
      <div className="flex gap-4 justify-center">
        {moods.map(({ value, emoji, label, colorClass }) => (
          <button
            key={value}
            onClick={() => handleSelect(value)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl transition-all duration-200 min-w-[90px] border-2 ${
              selected === value
                ? `${colorClass} border-transparent scale-105 card-shadow-lg`
                : "bg-card border-border hover:border-primary/30 card-shadow"
            }`}
          >
            <span className="text-3xl">{emoji}</span>
            <span className="text-sm font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
