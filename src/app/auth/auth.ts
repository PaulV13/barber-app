"use server";

import createSupabaseServerClient from "@/utils/supabase";

type FormUser = {
  email: string;
  name: string;
  phone: string;
  password: string;
};

export async function signUpWhitEmailAndPassword({
  email,
  name,
  phone,
  password,
}: FormUser) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });

  return data;
}

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return data;
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  return error;
}
