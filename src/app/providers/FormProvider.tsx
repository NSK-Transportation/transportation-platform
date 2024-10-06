import { ReactNode } from "react";
import { FormProvider as RHFProvider, useForm } from "react-hook-form";

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <RHFProvider {...methods}>{children}</RHFProvider>;
};
