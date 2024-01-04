"use client";

import { signOut } from "@/app/auth/auth";
import { BookingContext } from "@/context/BookingProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [showSettings, setShowSettings] = useState(false);
  const state = useContext(BookingContext);

  const showSetting = () => {
    setShowSettings(!showSettings);
  };

  const handleLogOut = async () => {
    state?.updateUser(null);
    setShowSettings(!showSettings);
    await signOut();
    router.push("/auth/login");
  };

  return (
    <>
      {showSettings && (
        <div
          className="absolute w-screen h-screen z-40"
          onClick={() => setShowSettings(false)}
        ></div>
      )}
      <header className="relative container mx-auto flex justify-end py-6">
        <Image
          width={48}
          height={48}
          onClick={showSetting}
          src="/profile.jpg"
          alt="Profile image"
          className="cursor-pointer rounded-full"
        />
        {showSettings && (
          <div className="absolute flex flex-col gap-2 top-[80px] w-[200px] bg-slate-800 rounded-md p-2 shadow-md z-50 text-white">
            <Link
              onClick={() => setShowSettings(false)}
              className="flex w-full p-2 hover:bg-slate-600 rounded-md text-sm"
              href="/"
            >
              Create booking
            </Link>
            <Link
              onClick={() => setShowSettings(false)}
              className="flex w-full p-2 hover:bg-slate-600 rounded-md text-sm"
              href="/bookings"
            >
              Bookings
            </Link>
            <Link
              className="flex w-full p-2 hover:bg-slate-600 rounded-md text-sm"
              onClick={() => setShowSettings(false)}
              href="/profile"
            >
              Profile
            </Link>
            <div className="w-full h-[1px] bg-slate-600"></div>
            {state?.user ? (
              <div className="flex w-full gap-2 items-center hover:bg-slate-600 rounded-md text-sm p-2 cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                  <path d="M15 12h-12l3 -3" />
                  <path d="M6 15l-3 -3" />
                </svg>
                <Link href="" onClick={handleLogOut}>
                  Log Out
                </Link>
              </div>
            ) : null}
          </div>
        )}
      </header>
    </>
  );
}
