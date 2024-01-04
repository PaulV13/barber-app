"use client";

import { BookingContext } from "@/context/BookingProvider";
import { GetSchedule, CreateSchedules } from "@/utils/getSchedules";
import { Schedule } from "@/typings";
import { format } from "date-fns";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DatePickerCalendar() {
  const state = useContext(BookingContext);
  const [scheduleSelected, setScheduleSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const disableSunday = (date: Date) => {
    const day = date.getDay();
    return day !== 0;
  };

  const getSchedules = async (date: Date) => {
    state?.addDate(date);
    setLoading(true);

    const dateFormatted = format(new Date(date), "dd-MM-yyyy");
    let newSchedules: Schedule[] = [];
    if (state?.barber != null) {
      newSchedules = await GetSchedule(dateFormatted, state.barber);

      if (newSchedules?.length == 0 || newSchedules == null) {
        newSchedules = await CreateSchedules(dateFormatted, state.barber);
      }
    }
    state?.addSchedules(newSchedules);
    setLoading(false);
  };

  const handleClick = (schedule: Schedule) => {
    setScheduleSelected(schedule);
    state?.addSchedule(schedule);
  };

  const getMinDate = () => {
    let date = new Date();

    if (date.getHours() >= 16) {
      return new Date(date.setDate(date.getDate() + 1));
    } else return date;
  };

  const schedulesFiltered = state?.schedules.filter(
    (schedule) =>
      schedule.available === true &&
      (schedule.date > format(new Date(), "dd-MM-yyyy") ||
        Number(schedule.hour.split(":")[0]) > new Date().getHours())
  );

  return (
    <section className="flex flex-col gap-6">
      <DatePicker
        id="datePicker"
        className="cursor-pointer bg-slate-800 p-2 rounded-md text-white"
        selected={state?.date}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select date..."
        minDate={getMinDate()}
        filterDate={disableSunday}
        onChange={getSchedules}
      />
      {loading ? (
        <p className="text-center text-white">Loading...</p>
      ) : schedulesFiltered?.length == 0 && state?.date ? (
        <p className="text-center text-white">No schedules available.</p>
      ) : (
        <div className="grid grid-cols-3">
          {schedulesFiltered?.map((schedule) => (
            <div
              onClick={() => handleClick(schedule)}
              className={`cursor-pointer text-center m-2 rounded-md bg-slate-800 text-white ${
                schedule == scheduleSelected
                  ? "border-4 border-blue-500"
                  : "border-4 border-transparent"
              }`}
              key={schedule.id}
            >
              <p>{schedule.hour}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default DatePickerCalendar;
