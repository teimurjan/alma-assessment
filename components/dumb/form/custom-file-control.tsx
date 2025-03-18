"use client";

import { isControl, rankWith } from "@jsonforms/core";
import { Input } from "../../ui/input";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";
import { Label } from "../../ui/label";
import { toBase64 } from "@/utils/base64";

export const CustomFileControl = withJsonFormsControlProps(
  ({ handleChange, path, errors, label, enabled, uischema }) => {
    const { submitted } = useCustomJsonFormContext();

    return (
      <div className="my-4">
        <div className="flex items-center gap-4">
          <Label>{label}</Label>
          <Input
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const base64 = await toBase64(file);
                handleChange(path, base64);
              }
            }}
            disabled={!enabled}
            accept={uischema.options?.accept}
            type="file"
          />
        </div>
        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customFileControlTester = rankWith(
  2,
  (uischema) => isControl(uischema) && uischema.options?.file
);
