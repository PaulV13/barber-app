"use server";

import { Barber, Schedule } from "../typings";
import createSupabaseServerClient from "./supabase";

export async function GetSchedule(
  date: string,
  barber: Barber
): Promise<Schedule[]> {
  const supabase = await createSupabaseServerClient();
  const { data: schedules } = await supabase
    .from("schedules")
    .select()
    .eq("date", date)
    .eq("barber", barber.id);

  if (schedules) {
    return schedules;
  }

  return [];
}

export async function CreateSchedules(
  date: string,
  barber: Barber
): Promise<Schedule[]> {
  const supabase = await createSupabaseServerClient();
  const hours = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
  for (var i = 0; i < hours.length; i++) {
    await supabase.from("schedules").insert({
      date: date,
      hour: hours[i],
      available: true,
      barber: barber.id,
    });
  }

  return await GetSchedule(date, barber);
}
