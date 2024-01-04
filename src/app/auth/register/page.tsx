import React from "react";
import RegisterForm from "./components/RegisterForm";

function page() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-white my-4 text-3xl">Register</h1>
      <RegisterForm />
    </main>
  );
}

export default page;
