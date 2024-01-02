import { Suspense } from "react";
import ListBarbers from "@/components/ListBarbers";
import ListServices from "@/components/ListServices";
import CardBarberLoader from "@/components/CardBarberLoader";
import supabase from "@/utils/supabase";
import ConfirmButton from "@/components/ConfirmButton";
import DatePickerCalendar from "@/components/DatePicker";
import CardServiceLoader from "@/components/CardServiceLoader";

export default async function Home() {
  const { data: services } = await supabase.from("services").select();
  const { data: barbers } = await supabase.from("barbers").select();
  return (
    <main className="flex flex-col items-center container mx-auto h-[calc(100vh-96px)] gap-20">
      <h1 className="text-3xl text-white">Booking barber</h1>
      <section className="flex gap-12">
        <section className="flex flex-col gap-8">
          <div>
            <p className="my-4 text-white">Select barber: </p>
            <Suspense fallback={<CardBarberLoader />}>
              <ListBarbers barbers={barbers} />
            </Suspense>
          </div>
          <div>
            <p className="my-4 text-white">Select service: </p>
            <Suspense fallback={<CardServiceLoader />}>
              <ListServices services={services} />
            </Suspense>
          </div>
        </section>
        <section className="flex flex-col">
          <h2 className="my-4 text-white">Calendar</h2>
          <DatePickerCalendar />
        </section>
      </section>
      <section>
        <ConfirmButton />
      </section>
    </main>
  );
}
