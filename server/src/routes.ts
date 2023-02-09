import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekdays: z.array(z.number().min(0).max(6)),
    });
    const { title, weekdays } = createHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekdays: {
          create: weekdays.map((weekday) => ({
            weekday,
          })),
        },
      },
    });
  });

  app.get("/day", async (request) => {
    const getDayQueryParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayQueryParams.parse(request.query);
    const parsedDate = dayjs(date).startOf("day");

    const weekday = parsedDate.get("day");
    console.log(date, weekday);

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        habitWeekdays: {
          some: {
            weekday,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits =
      day?.dayHabits.map((dayHabit) => dayHabit.habit_id) || [];

    return { possibleHabits, completedHabits };
  });
}
