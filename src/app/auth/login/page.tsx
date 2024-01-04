import React from "react";
import LoginForm from "./components/LoginForm";

function page() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-white my-4 text-3xl">Login</h1>
      <LoginForm />
    </main>
  );
}

export default page;
