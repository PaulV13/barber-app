"use client";

import { useContext } from "react";
import ItemService from "./CardService";
import { Service } from "@/typings";
import { BookingContext } from "@/context/BookingProvider";

type Props = {
  services: Service[] | null;
};

export default function ListServices({ services }: Props) {
  const state = useContext(BookingContext);

  const handleClick = (service: Service) => {
    state?.addService(service);
  };

  if (!services) {
    return <p>No services found.</p>;
  }

  return (
    <div className="flex flex-col items-center sm:flex-row gap-4">
      {services.map((service) => (
        <ItemService
          key={service.id}
          service={service}
          handleClick={handleClick}
        />
      ))}
    </div>
  );
}
