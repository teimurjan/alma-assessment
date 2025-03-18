"use client";

import { withJsonFormsControlProps } from "@jsonforms/react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { radioGroupControlTester } from "@jsonforms/vanilla-renderers";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";


export const CustomRadioGroupControl = withJsonFormsControlProps(
  ({ data, handleChange, path, schema, errors }) => {
    const { submitted } = useCustomJsonFormContext();

    return (
      <div className="my-4">
        <Label>{schema.title}</Label>
        <RadioGroup
          value={data}
          onValueChange={(value) => handleChange(path, value)}
        >
          {schema.enum?.map((option: string) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customRadioGroupControlTester = radioGroupControlTester;
