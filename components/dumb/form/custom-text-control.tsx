"use client";

import { isControl, rankWith } from "@jsonforms/core";
import { Input } from "../../ui/input";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";


export const CustomTextControl = withJsonFormsControlProps(
  ({ data, handleChange, path, errors, label, enabled, schema }) => {
    const { submitted } = useCustomJsonFormContext();

    const getInputType = () => {
      if (schema.format === "email") {
        return "email";
      }
      if (schema.format === "password") {
        return "password";
      }
      return "text";
    };

    return (
      <div className="my-4">
        <Input
          value={data || ""}
          onChange={(e) => handleChange(path, e.target.value)}
          placeholder={label}
          disabled={!enabled}
          type={getInputType()}
        />
        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customTextControlTester = rankWith(2, isControl);
