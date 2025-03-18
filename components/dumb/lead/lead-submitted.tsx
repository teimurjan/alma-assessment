"use client";
import { Button } from "../../ui/button";
import Image from "next/image";

interface LeadSubmittedProps {
  onBackToHomepageAction: () => void;
}

export const LeadSubmitted = ({
  onBackToHomepageAction,
}: LeadSubmittedProps) => {
  return (
    <div className="max-w-xl mx-auto pt-16 px-4">
      <div className="text-center space-y-6">
        <Image
          className="mx-auto"
          src="/info-icon.webp"
          width={100}
          height={100}
          alt="Alma"
        />

        <h2 className="text-2xl font-bold">Thank You</h2>
        <p className="font-bold mb-12">
          Your information was submitted to our team of immigration attorneys.
          Expect an email from hello@tryalma.ai
        </p>
        <Button className="w-full" onClick={onBackToHomepageAction}>
          Go Back to Homepage
        </Button>
      </div>
    </div>
  );
};
