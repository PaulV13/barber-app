"use client";

import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInWithEmail } from "../../auth";
import { useRouter } from "next/navigation";
import { BookingContext } from "@/context/BookingProvider";

type FormInput = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const state = useContext(BookingContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const response = await signInWithEmail(data.email, data.password);
    if (response.user) {
      const user = {
        email: response.user.email!!,
        name: response.user.user_metadata.name,
        phone: response.user.user_metadata.phone,
      };
      state?.updateUser(user);
      router.push("/");
    }
  };
  return (
    <form
      className="w-full max-w-sm flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col">
        <div className="md:flex md:items-center">
          <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
            Email
          </label>
          <input
            type="text"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs pt-2" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <div className="md:flex md:items-center">
          <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
            Password
          </label>
          <input
            type="password"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs pt-2" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
