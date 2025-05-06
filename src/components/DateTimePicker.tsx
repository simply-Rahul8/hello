
import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
}

const timeSlots = [
  "10:30", "11:00", "11:30", "12:00", "12:30", 
  "13:00", "13:30", "14:00", "14:30", "15:00"
];

export function DateTimePicker({ date, setDate, time, setTime }: DateTimePickerProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium mb-1">Date</div>
            {date ? (
              <div className="text-sm text-gray-500">
                {format(date, "MMMM dd, yyyy")}
              </div>
            ) : (
              <div className="text-sm text-gray-500">Pick a date</div>
            )}
          </div>
          
          <div>
            <div className="text-sm font-medium mb-1">Time</div>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((timeSlot) => (
                  <SelectItem key={timeSlot} value={timeSlot}>
                    {timeSlot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className={cn("p-3 pointer-events-auto rounded-md border")}
      />
    </div>
  );
}
