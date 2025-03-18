"use client";

import { FormEvent, FormEventHandler, useRef, useState } from "react";
import {
  JsonForms,
  JsonFormsInitStateProps,
  JsonFormsReactProps,
} from "@jsonforms/react";
import {
  HorizontalLayout,
  horizontalLayoutTester,
  vanillaCells,
  VerticalLayout,
  verticalLayoutTester,
} from "@jsonforms/vanilla-renderers";

import { Button } from "../../ui/button";
import {
  CustomTextControl,
  customTextControlTester,
} from "./custom-text-control";
import {
  CustomSelectControl,
  customSelectControlTester,
} from "./custom-select-control";
import {
  CustomRadioGroupControl,
  customRadioGroupControlTester,
} from "./custom-radio-group-control";
import {
  CustomMultitextControl,
  customMultitextControlTester,
} from "./custom-multitext-control";
import {
  CustomCheckboxGroupControl,
  customCheckboxGroupControlTester,
} from "./custom-checkbox-group-control";
import {
  CustomTextWithImage,
  customTextWithImageTester,
} from "./custom-text-with-image";
import {
  CustomFileControl,
  customFileControlTester,
} from "./custom-file-control";
import { createSchemaValidator } from "@/validator/create-schema-validator";
import { CustomJsonFormContext } from "@/components/context/custom-json-form";

const renderers = [
  { tester: verticalLayoutTester, renderer: VerticalLayout },
  { tester: horizontalLayoutTester, renderer: HorizontalLayout },
  {
    tester: customCheckboxGroupControlTester,
    renderer: CustomCheckboxGroupControl,
  },
  { tester: customRadioGroupControlTester, renderer: CustomRadioGroupControl },
  { tester: customSelectControlTester, renderer: CustomSelectControl },
  { tester: customFileControlTester, renderer: CustomFileControl },
  { tester: customMultitextControlTester, renderer: CustomMultitextControl },
  { tester: customTextControlTester, renderer: CustomTextControl },
  { tester: customTextWithImageTester, renderer: CustomTextWithImage },
];

interface CustomJsonFormProps<T>
  extends Omit<JsonFormsInitStateProps, "renderers" | "cells" | "data" | "ajv">,
    JsonFormsReactProps {
  submitText?: string;
  onSubmitAction: (
    event: FormEvent<HTMLFormElement>,
    data: T | undefined,
    reset: () => void
  ) => void;
  loading?: boolean;
}

export default function CustomJsonForm<T>({
  submitText,
  onSubmitAction,
  loading,
  ...rest
}: CustomJsonFormProps<T>) {
  const [data, setData] = useState<T>();
  const [hasError, setHasError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const validatorRef = useRef(createSchemaValidator());

  const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (hasError) {
      return;
    }

    onSubmitAction(e, data, () => setData(undefined));
  };

  return (
    <CustomJsonFormContext value={{ submitted }}>
      <form onSubmit={handleSignIn}>
        <JsonForms
          ajv={validatorRef.current}
          data={data || {}}
          renderers={renderers}
          cells={vanillaCells}
          onChange={({ data, errors }) => {
            setData(data);
            setHasError(!!errors && errors.length > 0);
          }}
          validationMode="ValidateAndShow"
          {...rest}
        />
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {submitText}
        </Button>
      </form>
    </CustomJsonFormContext>
  );
}
