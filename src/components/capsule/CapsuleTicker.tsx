
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface CapsuleEvent {
  title: string;
  type: "lock" | "reveal";
  date: Date;
}

// Sample data until we can properly access the Supabase tables
const sampleCapsuleEvents = [
  {
    title: "Family Photos 2023",
    type: "lock" as const,
    date: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  },
  {
    title: "Holiday Memories",
    type: "reveal" as const,
    date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
  },
  {
    title: "Summer Vacation",
    type: "lock" as const,
    date: new Date(new Date().getTime() + 21 * 24 * 60 * 60 * 1000) // 21 days from now
  }
];

const CapsuleTicker = () => {
  const [events, setEvents] = useState<CapsuleEvent[]>([]);

  useEffect(() => {
    const fetchCapsuleEvents = async () => {
      try {
        // Using hardcoded sample data for now to avoid Supabase type errors
        setEvents(sampleCapsuleEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));
      } catch (error) {
        console.error('Error fetching capsule schedules:', error);
      }
    };

    fetchCapsuleEvents();
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-amber-500 font-mono text-sm py-2 border-t border-amber-500/30 overflow-hidden z-50">
      <div className="animate-[marquee_120s_linear_infinite] whitespace-nowrap">
        {events.map((event, index) => (
          <span key={index} className="mx-8">
            *** {event.title.toUpperCase()} {event.type === "lock" ? "LOCKS" : "REVEALS"} {format(event.date, "MMM dd yyyy HH:mm")} ***
          </span>
        ))}
      </div>
    </div>
  );
};

export default CapsuleTicker;
