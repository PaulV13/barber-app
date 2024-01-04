import { UUID } from "crypto";

export type Service = {
  id: UUID;
  name: string;
  price: number;
};

export type Barber = {
  id: UUID;
  name: string;
  photo: string;
};

export type Schedule = {
  id: UUID;
  date: string;
  hour: string;
  available: boolean;
  barber: UUID;
};

export type ScheduleCreate = {
  date: string;
  hour: string;
  available: boolean;
  barber: UUID;
};

export type Booking = {
  service: Service;
  schedule: Schedule;
  user_id: User;
};

export type BookingCreate = {
  service: UUID;
  schedule: UUID;
  user_id: UUID;
};

export type User = {
  id?: UUID;
  name: string;
  email: string;
  phone: string;
};
