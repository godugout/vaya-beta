import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface CapsuleEvent {
  title: string;
  type: "lock" | "reveal";
  date: Date;
}

const CapsuleTicker = () => {
  const [events, setEvents] = useState<CapsuleEvent[]>([]);

  useEffect(() => {
    const fetchCapsuleEvents = async () => {
      const { data: schedules, error } = await supabase
        .from('capsule_schedules')
        .select('title, lock_deadline, reveal_date')
        .or('status.eq.upcoming,status.eq.locked')
        .order('lock_deadline', { ascending: true });

      if (error) {
        console.error('Error fetching capsule schedules:', error);
        return;
      }

      const newEvents: CapsuleEvent[] = [];
      schedules?.forEach((schedule) => {
        newEvents.push({
          title: schedule.title,
          type: "lock",
          date: new Date(schedule.lock_deadline),
        });
        newEvents.push({
          title: schedule.title,
          type: "reveal",
          date: new Date(schedule.reveal_date),
        });
      });

      setEvents(newEvents.sort((a, b) => a.date.getTime() - b.date.getTime()));
    };

    fetchCapsuleEvents();
  }, []);

  return (
    <div className="bg-black text-amber-500 font-mono text-sm py-2 border-t border-amber-500/30 overflow-hidden">
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