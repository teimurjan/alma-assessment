"use client";

import { FormEvent, useState } from "react";
import schema from "@/schema/lead-schema.json";
import { LeadSchema } from "@/schema/lead-schema";
import Image from "next/image";
import CustomJsonForm from "../dumb/form/custom-json-form";
import { LeadSubmitted } from "../dumb/lead/lead-submitted";
import { toast } from "sonner";
import { uischema } from "@/schema/lead-uischema";
import { useCreateLead } from "@/data/use-create-lead";

enum Status {
  Idle,
  Loading,
  Success,
}

export default function LeadForm() {
  const [status, setStatus] = useState<Status>(Status.Idle);
  const { mutateAsync: createLead, isPending } = useCreateLead();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: LeadSchema | undefined,
    reset: () => void
  ) => {
    e.preventDefault();

    if (!data) {
      toast.error("Form is not valid.");
      return;
    }

    try {
      await createLead(data);
      reset();
      setStatus(Status.Success);
    } catch (e) {
      toast.error("Something went wrong.", { description: String(e) });
    }
  };

  if (status === Status.Success) {
    return (
      <LeadSubmitted
        onBackToHomepageAction={() => {
          setStatus(Status.Idle);
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-12 space-y-4">
        <Image
          className="mx-auto"
          src="/info-icon.webp"
          width={100}
          height={100}
          alt="Alma"
        />

        <h2 className="text-2xl font-bold">
          Want to understand your visa options?
        </h2>
        <p className="mx-auto font-bold">
          Submit the form below and our team of experienced attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals.
        </p>
      </div>

      <div className="space-y-8 max-w-xl mx-auto">
        <CustomJsonForm
          schema={schema}
          uischema={uischema}
          onSubmitAction={handleSubmit}
          submitText="Submit"
          loading={isPending}
        />
      </div>
    </div>
  );
}
