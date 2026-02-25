import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Moon, Footprints, Heart, FileText } from "lucide-react";

type Mood = "good" | "okay" | "bad";

const steps = [
  { id: "mood", title: "General Status", icon: "😊" },
  { id: "sleep", title: "Sleep", icon: Moon },
  { id: "activity", title: "Activity", icon: Footprints },
  { id: "vitals", title: "Vital Signs", icon: Heart },
  { id: "notes", title: "Notes", icon: FileText },
];

const Registration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMood = (searchParams.get("mood") as Mood) || null;

  const [currentStep, setCurrentStep] = useState(initialMood ? 1 : 0);
  const [mood, setMood] = useState<Mood | null>(initialMood);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepQuality, setSleepQuality] = useState<"good" | "fair" | "poor">("good");
  const [steps_, setSteps] = useState(5000);
  const [heartRate, setHeartRate] = useState(72);
  const [note, setNote] = useState("");

  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const canNext = () => {
    if (currentStep === 0) return mood !== null;
    return true;
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
  };

  const isLast = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={handleBack} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center text-foreground">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-foreground">Daily Log</h1>
          <p className="text-xs text-muted-foreground">Step {currentStep + 1} of {totalSteps}</p>
        </div>
      </header>

      <div className="px-5 mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full health-gradient rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 px-5 animate-fade-in" key={currentStep}>
        {currentStep === 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">How are you feeling today?</h2>
            <div className="space-y-3">
              {([
                { value: "good" as Mood, emoji: "😊", label: "Good", desc: "I feel energized" },
                { value: "okay" as Mood, emoji: "😐", label: "Okay", desc: "A normal day" },
                { value: "bad" as Mood, emoji: "😔", label: "Bad", desc: "I'm not feeling well" },
              ]).map(({ value, emoji, label, desc }) => (
                <button
                  key={value}
                  onClick={() => setMood(value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    mood === value ? "border-primary bg-secondary card-shadow" : "border-border bg-card"
                  }`}
                >
                  <span className="text-3xl">{emoji}</span>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">How did you sleep?</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Hours of sleep</label>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => setSleepHours(Math.max(0, sleepHours - 0.5))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">-</button>
                  <span className="text-4xl font-bold text-foreground flex-1 text-center">{sleepHours}h</span>
                  <button onClick={() => setSleepHours(Math.min(14, sleepHours + 0.5))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">+</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Sleep quality</label>
                <div className="flex gap-2 mt-3">
                  {(["good", "fair", "poor"] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => setSleepQuality(q)}
                      className={`flex-1 py-3 rounded-xl font-semibold text-sm capitalize transition-all ${
                        sleepQuality === q ? "health-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Physical Activity</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-4">
              <label className="text-sm font-medium text-muted-foreground">Estimated steps</label>
              <input type="range" min={0} max={20000} step={500} value={steps_} onChange={(e) => setSteps(Number(e.target.value))} className="w-full accent-primary" />
              <div className="flex items-end gap-1 justify-center">
                <span className="text-4xl font-bold text-foreground">{steps_.toLocaleString()}</span>
                <span className="text-muted-foreground text-sm mb-1">steps</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full health-gradient rounded-full transition-all" style={{ width: `${Math.min((steps_ / 10000) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-muted-foreground text-center">Goal: 10,000 steps</p>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Vital Signs</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Heart rate (bpm)</label>
                <div className="flex items-center gap-4 mt-3">
                  <button onClick={() => setHeartRate(Math.max(40, heartRate - 1))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">-</button>
                  <div className="flex-1 text-center">
                    <span className="text-4xl font-bold text-foreground">{heartRate}</span>
                    <span className="text-muted-foreground text-sm ml-1">bpm</span>
                  </div>
                  <button onClick={() => setHeartRate(Math.min(200, heartRate + 1))} className="w-12 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold text-xl flex items-center justify-center">+</button>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3">
                <p className="text-xs text-secondary-foreground">💡 If you have a connected wearable, this data will sync automatically.</p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">Daily Notes</h2>
            <div className="bg-card rounded-2xl p-6 card-shadow">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Anything you'd like to remember about your day? (optional)"
                className="w-full h-32 bg-muted rounded-xl p-4 text-foreground placeholder:text-muted-foreground text-sm resize-none border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-2">{note.length}/200 characters</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-6">
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
            canNext() ? "health-gradient text-primary-foreground card-shadow-lg hover:scale-[1.02] active:scale-[0.98]" : "bg-muted text-muted-foreground"
          }`}
        >
          {isLast ? (<><Check size={20} />Save Log</>) : (<>Next<ArrowRight size={20} /></>)}
        </button>
      </div>
    </div>
  );
};

export default Registration;
