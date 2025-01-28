import { cn } from "@/lib/utils";
import { format, isPast, isToday, addDays } from "date-fns";

interface PillTimerProps {
  date: string;
  status: string;
  colorKey: string;
}

const orbitingProfiles = [
  { initials: "JD", angle: 0 },
  { initials: "AS", angle: 120 },
  { initials: "MK", angle: 240 },
];

const getStatusColor = (status: string, date: string): string => {
  const statusDate = new Date(date);
  const isClosingSoon = !isPast(statusDate) && isToday(statusDate);
  const isOpeningSoon = !isPast(statusDate) && isToday(addDays(statusDate, -1));

  const colors = {
    upcoming: "stroke-[#9b87f5]",
    active: "stroke-[#F97316]",
    locked: "stroke-[#D946EF]",
    revealed: "stroke-[#0EA5E9]",
    closing: "stroke-[#8B5CF6]",
    opening: "stroke-[#1EAEDB]",
  };

  if (isClosingSoon) return colors.closing;
  if (isOpeningSoon) return colors.opening;
  if (status === "locked") return colors.locked;
  if (status === "active") return colors.active;
  if (status === "revealed") return colors.revealed;
  return colors.upcoming;
};

export const PillTimer = ({ date, status, colorKey }: PillTimerProps) => {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full bg-gray-50 border-2 border-gray-100" />
      
      <svg
        className="absolute inset-0 w-full h-full -rotate-90 animate-[spin_3s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <circle
          className={cn(
            "transition-all duration-300",
            getStatusColor(status, date)
          )}
          cx="50"
          cy="50"
          r="48"
          fill="none"
          strokeWidth="2"
          strokeDasharray="301.59"
          strokeDashoffset="75"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="301.59;75;301.59"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      
      {orbitingProfiles.map((profile, index) => (
        <div
          key={profile.initials}
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${profile.angle}deg) translateY(-32px) rotate(-${profile.angle}deg)`,
          }}
        >
          <div className={cn(
            "w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center",
            `border-vaya-${colorKey}`,
            "text-xs font-medium animate-pulse"
          )}>
            {profile.initials}
          </div>
        </div>
      ))}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-vaya-gray-800">
          {format(new Date(date), 'd')}
        </span>
        <span className="text-xs font-medium text-vaya-gray-600">
          {format(new Date(date), 'MMM')}
        </span>
      </div>
    </div>
  );
};