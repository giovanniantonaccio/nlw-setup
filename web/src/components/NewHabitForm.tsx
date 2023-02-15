import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekdays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]);

  const createNewHabit = async (event: FormEvent) => {
    event.preventDefault();

    if (!title || selectedWeekdays.length === 0) return;

    await api.post("/habits", { title, weekdays: selectedWeekdays });

    alert("Hábito criado com sucesso!");

    setTitle("");
    setSelectedWeekdays([]);
  };

  const handleToggleSelectedWeekday = (weekdayIndex: number) => {
    if (selectedWeekdays.includes(weekdayIndex)) {
      setSelectedWeekdays((prev) =>
        prev.filter((weekday) => weekday !== weekdayIndex)
      );
    } else {
      setSelectedWeekdays((prev) => [...prev, weekdayIndex]);
    }
  };

  return (
    <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex: Exercícios, dormir bem, etc..."
        autoFocus
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-6">
        Qual a recorrência?
      </label>

      <div className="mt-6 flex flex-col gap-3">
        {availableWeekdays.map((weekday, index) => (
          <Checkbox.Root
            key={weekday}
            className="flex items-center gap-3 group"
            onCheckedChange={() => handleToggleSelectedWeekday(index)}
            checked={selectedWeekdays.includes(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>
            <span className="text-white leading-tight">{weekday}</span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
