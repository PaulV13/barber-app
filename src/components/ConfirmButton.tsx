"use client";

import { BookingContext } from "@/context/BookingProvider";
import { Booking, BookingCreate } from "@/typings";
import { createBooking } from "@/utils/createBooking";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

function ConfirmButton() {
  const state = useContext(BookingContext);

  const handleConfirmBooking = async () => {
    const booking: BookingCreate = {
      service: state?.service?.id!!,
      schedule: state?.schedule?.id!!,
      user_id: state?.user?.id!!,
    };
    const response = await createBooking(booking);

    if (response.status === 201) {
      toast.success("Booking created successfully!!!");
      state?.resetState();
    } else toast.error(`The schedule selected is not available`);
  };

  return (
    <>
      <button
        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleConfirmBooking}
      >
        Confirm booking
      </button>
      <Toaster />
    </>
  );
}

export default ConfirmButton;
