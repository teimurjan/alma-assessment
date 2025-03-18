"use client";

import { withJsonFormsControlProps } from "@jsonforms/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { isEnumControl, rankWith } from "@jsonforms/core";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";


export const CustomSelectControl = withJsonFormsControlProps(
  ({ data, handleChange, path, label, schema, errors }) => {
    const { submitted } = useCustomJsonFormContext();

    return (
      <div className="my-4">
        <Select
          value={data}
          onValueChange={(value) => handleChange(path, value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={label} />
          </SelectTrigger>
          <SelectContent>
            {schema.enum?.map((value: string, index: number) => (
              <SelectItem key={value} value={value}>
                {schema.enum?.[index] || value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customSelectControlTester = rankWith(2, isEnumControl);
