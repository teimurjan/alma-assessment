"use client";

import { withJsonFormsControlProps } from "@jsonforms/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { isControl, JsonSchema4, rankWith } from "@jsonforms/core";
import { useCustomJsonFormContext } from "@/components/context/custom-json-form";

export const CustomCheckboxGroupControl = withJsonFormsControlProps(
  ({ data, path, schema, label, uischema, errors, handleChange }) => {
    const { submitted } = useCustomJsonFormContext();
    const selectedValues = Array.isArray(data) ? data : [];

    const toggleValue = (value: string) => {
      if (selectedValues.includes(value)) {
        const newValues = selectedValues.filter((v) => v !== value);
        handleChange(path, newValues);
      } else {
        const newValues = [...selectedValues, value];
        handleChange(path, newValues);
      }
    };

    return (
      <div className="my-4">
        {uischema.label && <Label className="text-base">{label}</Label>}
        {schema.description && (
          <p className="text-sm text-muted-foreground mb-2">
            {schema.description}
          </p>
        )}
        <div className="space-y-2">
          {(schema.items as JsonSchema4).enum?.map((option, index) => (
            <div key={option} className="flex items-start space-x-2">
              <Checkbox
                id={`${path}-${option}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={() => toggleValue(option)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={`${path}-${option}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {(schema.items as JsonSchema4).enum?.[index] || option}
                </Label>
              </div>
            </div>
          ))}
        </div>
        {errors && submitted && (
          <p className="text-red-500 text-xs mt-1">{errors}</p>
        )}
      </div>
    );
  }
);

export const customCheckboxGroupControlTester = rankWith(
  2,
  (uischema) => isControl(uischema) && uischema.options?.format === "checkbox"
);
