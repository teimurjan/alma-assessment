"use client";

import { cn } from "@/lib/utils";
import { rankWith } from "@jsonforms/core";
import { withJsonFormsRendererProps } from "@jsonforms/react";
import Image from "next/image";

export const CustomTextWithImage = withJsonFormsRendererProps(
  ({ uischema }) => {
    const { text, imageUrl, imageAlt, imageWidth, imageHeight, layout } =
      uischema?.options || {};

    const alt = imageAlt || "Image";
    const width = imageWidth || 100;
    const height = imageHeight || 100;
    const displayLayout = layout || "column";

    return (
      <div
        className={cn(
          "flex gap-4 text-center my-4",
          displayLayout === "column" ? "flex-col" : "flex-row items-center"
        )}
      >
        {imageUrl && (
          <div className="mx-auto">
            <Image
              src={imageUrl || "/info-icon.webp"}
              alt={alt}
              width={width}
              height={height}
            />
          </div>
        )}
        <div className={displayLayout === "column" ? "" : "flex-1"}>
          {text && <div className="text-2xl font-bold">{text}</div>}
        </div>
      </div>
    );
  }
);

export const customTextWithImageTester = rankWith(
  2,
  (uischema) => uischema.type === "TextWithImage"
);
