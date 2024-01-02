"use client";
import { BookingContext } from "@/context/BookingProvider";
import supabase from "@/utils/supabase";
import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

function ConfirmButton() {
  const state = useContext(BookingContext);

  const handleConfirmBooking = async () => {
    const booking = {
      service: state?.service?.id,
      schedule: state?.schedule?.id,
      user_id: state?.user?.id,
    };
    const response = await supabase.from("bookings").insert(booking).select();
    state?.resetState();

    if (response.status === 201) {
      toast.success("Booking created successfully!!!");
    } else toast.error(`The schedule selected is not available`);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
        onClick={handleConfirmBooking}
      >
        Confirm booking
      </button>
      <Toaster />
    </>
  );
}

export default ConfirmButton;
