"use client";

import React, { FormEvent } from "react";
import { toast } from "sonner";
import schema from "@/schema/sign-in-schema.json";
import { SignInSchema } from "@/schema/sign-in-schema";
import CustomJsonForm from "../dumb/form/custom-json-form";
import { uischema } from "@/schema/sign-in-uischema";
import { useSignIn } from "@/data/use-sign-in";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const { mutateAsync: signIn, isPending } = useSignIn();
  const router = useRouter()

  const handleSignIn = async (
    e: FormEvent<HTMLFormElement>,
    data: SignInSchema | undefined
  ) => {
    e.preventDefault();
    if (!data) {
      toast.error("Form is not valid.");
      return;
    }

    try {
      await signIn(data);
      toast.success("Sign in successful!");
      router.replace("/internal");
    } catch (e) {
      toast.error("Something went wrong.", { description: String(e) });
    }
  };

  return (
    <div className="w-[400px] mx-auto max-w-full">
      <h3 className="text-center font-semibold mb-6">Sign in</h3>
      <CustomJsonForm
        schema={schema}
        uischema={uischema}
        onSubmitAction={handleSignIn}
        submitText="Sign in"
        loading={isPending}
      />
    </div>
  );
}
