"use client";

import { isControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";
import { Textarea } from "../../ui/textarea";

export const CustomMultitextControl = withJsonFormsControlProps(
  ({ data, handleChange, path, errors, label, enabled }) => {
    const { submitted } = useCustomJsonFormContext();

    return (
      <div className="my-4">
        <Textarea
          value={data || ""}
          onChange={(e) => handleChange(path, e.target.value)}
          placeholder={label}
          disabled={!enabled}
        />
        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customMultitextControlTester = rankWith(
  2,
  (uischema) => isControl(uischema) && uischema.options?.multi
);
