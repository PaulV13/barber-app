"use client";

import { Barber, Booking, Schedule, Service, User } from "@/typings";
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
  addName: (name: string) => void;
  addEmail: (email: string) => void;
  addPhone: (phone: string) => void;
  resetSchedules: () => void;
  addSchedules: (schedules: Schedule[]) => void;
  resetState: () => void;
  addDate: (date: Date) => void;
  resetDate: () => void;
  updateUser: (user: User) => void;
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
  const [user, setUser] = useState<User>({
    id: "fd243054-d0c4-4a69-a163-61d6ccaf8706",
    name: "Paul",
    email: "paulvidart@gmail.com",
    phone: "099387808",
  });

  const resetState = () => {
    setBarber(null);
    setService(null);
    setSchedule(null);
    setSchedules([]);
    setDate(null);
  };

  const updateUser = (user: User) => {
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

  const addName = (name: string) => {
    setUser({
      ...user,
      name: name,
    });
  };

  const addEmail = (email: string) => {
    setUser({
      ...user,
      email: email,
    });
  };

  const addPhone = (phone: string) => {
    setUser({
      ...user,
      phone: phone,
    });
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
        resetState,
        addBarber,
        addService,
        addSchedule,
        addName,
        addEmail,
        addPhone,
        addSchedules,
        resetSchedules,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
