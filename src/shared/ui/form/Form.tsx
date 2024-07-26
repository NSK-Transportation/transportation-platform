import { FormHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Form.module.scss";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdError } from "react-icons/md";

interface CustomFormProps<T extends FieldValues> {
  className?: string;
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  children: ReactNode;
}

export type FormProps<T extends FieldValues> = CustomFormProps<T> &
  Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit">;

const Form = forwardRef<HTMLFormElement, FormProps<any>>(
  ({ onSubmit, defaultValues, children, className, ...props }, ref) => {
    const methods = useForm({
      defaultValues,
      mode: "onSubmit",
    });

    return (
      <FormProvider {...methods}>
        <form
          className={clsx(styles.form, className)}
          ref={ref}
          onSubmit={methods.handleSubmit(onSubmit)}
          {...props}
        >
          {children}
          {Object.keys(methods.formState.errors).length > 0 && (
            <div className={styles.form__errors}>
              {Object.keys(methods.formState.errors).map((fieldName) => {
                const error = methods.formState.errors[fieldName];
                if (typeof error?.message === "string") {
                  return (
                    <span key={fieldName} className={styles.form__message}>
                      <MdError />
                      {error.message}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          )}
        </form>
      </FormProvider>
    );
  },
);

Form.displayName = "Form";

export { Form };
