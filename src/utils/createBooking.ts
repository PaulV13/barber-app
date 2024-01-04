"use server";
import { BookingCreate } from "@/typings";
import createSupabaseServerClient from "./supabase";

export async function createBooking(booking: BookingCreate) {
  const supabase = await createSupabaseServerClient();
  const response = await supabase.from("bookings").insert(booking).select();

  return response;
}
