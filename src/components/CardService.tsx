"use client";
import { BookingContext } from "@/context/BookingProvider";
import { Service } from "@/typings";
import { useContext } from "react";

type Props = {
  service: Service;
  handleClick: (service: Service) => void;
};

function CardService({ service, handleClick }: Props) {
  const state = useContext(BookingContext);

  return (
    <div
      className={`flex justify-between gap-3 rounded overflow-hidden shadow-lg cursor-pointer p-4 bg-slate-800 text-white
      ${
        state?.service?.name === service.name
          ? "border-4 border-blue-500"
          : "border-4 border-transparent"
      }`}
      onClick={() => handleClick(service)}
      key={service.id}
    >
      <p>{service.name}</p>
      <p>${service.price}</p>
    </div>
  );
}

export default CardService;
