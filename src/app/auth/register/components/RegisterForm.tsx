"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUp } from "../../auth";

type FormInput = {
  email: string;
  name: string;
  phone: string;
  password: string;
};

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    console.log(data);
    const response = await signUp(data);
    console.log(response);
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
            Name
          </label>
          <input
            type="text"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            {...register("name", { required: "Name is required" })}
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs pt-2" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <div className="md:flex md:items-center">
          <label className="block text-white font-bold md:text-right mb-1 md:mb-0 pr-4">
            Phone
          </label>
          <input
            type="text"
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            {...register("phone", {
              pattern: {
                value: /^([0-9]+)$/,
                message: "Invalid phone",
              },
              minLength: {
                value: 9,
                message: "The phone number must be at least 9 characters",
              },
            })}
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs pt-2" role="alert">
            {errors.phone.message}
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
        Sign up
      </button>
    </form>
  );
}

export default RegisterForm;
