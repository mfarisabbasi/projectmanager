"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { signInValidation } from "@/lib/validations";
import { useState } from "react";
import SignInForm from "@/components/auth/SignInForm";

const SignIn = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    const response = await fetch("/api/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      toast({
        title: "Success",
        description: response.statusText,
        className: "bg-green-500 text-black",
      });
    } else {
      console.log(response);
      toast({
        title: "Error",
        description: response.statusText,
        className: "bg-red-500 text-black",
      });
    }

    setLoading(false);
  }

  return (
    <section className="bg-white border border-primary rounded-lg sm:p-12 p-6 sm:w-[500px] w-full">
      <h2>Sign in to continue</h2>
      <SignInForm form={form} loading={loading} onSubmit={onSubmit} />
    </section>
  );
};

export default SignIn;
