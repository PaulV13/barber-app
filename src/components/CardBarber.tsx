"use client";

import { BookingContext } from "@/context/BookingProvider";
import { Barber } from "@/typings";
import Image from "next/image";
import { useContext } from "react";

type Props = {
  barber: Barber;
  handleClick: (barber: Barber) => void;
};

export default function CardBarber({ barber, handleClick }: Props) {
  const state = useContext(BookingContext);
  return (
    <div
      onClick={() => handleClick(barber)}
      className={`w-[150px] flex flex-col justify-center items-center rounded overflow-hidden shadow-lg cursor-pointer p-4 bg-slate-800
      ${
        state?.barber?.name === barber.name
          ? "border-4 border-blue-500"
          : "border-4 border-transparent"
      }`}
    >
      <Image
        width={1920}
        height={1080}
        className="w-[70px] h-[70px] rounded-full object-cover"
        src={barber.photo}
        alt={`Image ${barber.name}`}
      />
      <div className="py-2 font-bold text-xl text-white">{barber.name}</div>
    </div>
  );
}
