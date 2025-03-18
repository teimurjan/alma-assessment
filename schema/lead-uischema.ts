export const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/firstName",
    },
    {
      type: "Control",
      scope: "#/properties/lastName",
    },
    {
      type: "Control",
      scope: "#/properties/email",
    },
    {
      type: "Control",
      scope: "#/properties/country",
    },
    {
      type: "Control",
      scope: "#/properties/linkedIn",
    },
    {
      type: "Control",
      scope: "#/properties/resume",
      options: {
        file: true,
        accept: "application/pdf",
      },
    },
    {
      type: "TextWithImage",
      options: {
        text: "Visa cateogries of interest?",
        imageUrl: "/dice-icon.webp",
        imageAlt: "Info",
      },
    },
    {
      type: "Control",
      scope: "#/properties/visaCategory",
      options: {
        format: "checkbox",
      },
    },
    {
      type: "TextWithImage",
      options: {
        text: "How can we help you?",
        imageUrl: "/heart-icon.webp",
        imageAlt: "Info",
      },
    },
    {
      type: "Control",
      scope: "#/properties/details",
      label:
        "What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?",
      options: {
        multi: true,
      },
    },
  ],
};
