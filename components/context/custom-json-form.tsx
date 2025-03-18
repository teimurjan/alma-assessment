import { createContext, useContext } from "react";

type CustomJsonFormContextValue = {
  submitted?: boolean;
};

export const CustomJsonFormContext = createContext<CustomJsonFormContextValue>(
  {}
);

export const useCustomJsonFormContext = () => {
  return useContext(CustomJsonFormContext);
};
