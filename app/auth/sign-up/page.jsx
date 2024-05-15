"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { signUpValidation } from "@/lib/validations";
import { useState } from "react";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUp = () => {
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
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
      <h2>Get Started</h2>
      <h4>By creating an account.</h4>
      <SignUpForm form={form} loading={loading} onSubmit={onSubmit} />
    </section>
  );
};

export default SignUp;
