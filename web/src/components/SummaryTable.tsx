import { useEffect, useState } from "react";
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning";
import { HabitDay } from "./HabitDay";
import { api } from "../lib/axios";
import dayjs from "dayjs";

const WEEK = 7;

const weekdays = [
  { text: "D", key: "sunday" },
  { text: "S", key: "monday" },
  { text: "T", key: "tuesday" },
  { text: "Q", key: "wednesday" },
  { text: "Q", key: "thursday" },
  { text: "S", key: "friday" },
  { text: "S", key: "saturday" },
];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * WEEK;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  completed: number;
  amount: number;
}[];

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([]);

  useEffect(() => {
    api.get("summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekdays.map((weekday) => (
          <div
            key={weekday.key}
            className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center"
          >
            {weekday.text}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map((date) => {
          const dayInSummary = summary.find((day) => {
            return dayjs(date).isSame(day.date, "day");
          });
          console.log("d", dayInSummary);
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              completed={dayInSummary?.completed}
              amount={dayInSummary?.amount}
            />
          );
        })}
        {amountOfDaysToFill > 0
          ? Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              ></div>
            ))
          : null}
      </div>
    </div>
  );
}
