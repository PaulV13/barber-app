"use client";

import { Barber, Schedule, Service, User } from "@/typings";
import { createContext, useState } from "react";

type BookingContextType = {
  barber: Barber | null;
  service: Service | null;
  schedule: Schedule | null;
  schedules: Schedule[];
  user: User | null;
  date: Date | null;
  addBarber: (barber: Barber) => void;
  addService: (service: Service) => void;
  addSchedule: (schedule: Schedule) => void;
  resetSchedules: () => void;
  addSchedules: (schedules: Schedule[]) => void;
  resetStateBooking: () => void;
  addDate: (date: Date) => void;
  resetDate: () => void;
  updateUser: (user: User | null) => void;
};

interface IProps {
  children: React.ReactNode;
}

export const BookingContext = createContext<BookingContextType | null>(null);

export const BookingProvider = ({ children }: IProps) => {
  const [barber, setBarber] = useState<Barber | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const resetStateBooking = () => {
    setBarber(null);
    setService(null);
    setSchedule(null);
    setSchedules([]);
    setDate(null);
  };

  const updateUser = (user: User | null) => {
    setUser(user);
  };

  const resetSchedules = () => {
    setSchedules([]);
  };

  const addSchedules = (schedules: Schedule[]) => {
    setSchedules(schedules);
  };

  const addBarber = (barber: Barber) => {
    setBarber(barber);
  };

  const addService = (service: Service) => {
    setService(service);
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedule(schedule);
  };

  const addDate = (date: Date) => {
    setDate(date);
  };

  const resetDate = () => {
    setDate(null);
  };

  return (
    <BookingContext.Provider
      value={{
        barber,
        service,
        schedule,
        user,
        schedules,
        date,
        updateUser,
        addDate,
        resetDate,
        resetStateBooking,
        addBarber,
        addService,
        addSchedule,
        addSchedules,
        resetSchedules,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
