"use client";

import { Barber } from "@/typings";
import CardBarber from "./CardBarber";
import { useContext } from "react";
import { BookingContext } from "@/context/BookingProvider";

type Props = {
  barbers: Barber[] | null;
};

export default function ListBarbers({ barbers }: Props) {
  const state = useContext(BookingContext);

  const handleClick = (barber: Barber) => {
    state?.addBarber(barber);
    state?.resetSchedules();
    state?.resetDate();
  };

  if (!barbers) {
    return <p>No barbers found.</p>;
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center sm:flex-row gap-4">
        {barbers.map((barber) => (
          <CardBarber
            key={barber.id}
            barber={barber}
            handleClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}
