import { Meta, StoryFn } from "@storybook/react";
import { Form, FormProps } from "./Form";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Stacks } from "../stacks/Stacks";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
  argTypes: {
    onSubmit: { action: "onSubmit" },
    defaultValues: { control: "object" },
    children: { control: "object" },
    className: { control: "text" },
  },
  args: {
    onSubmit: () => {},
    defaultValues: {},
    children: null,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<FormProps<any>> = (args) => {
  const [state, setState] = useState(false);
  const onSubmit = (data: any) => {
    setState(true);
    console.log(data);
    setTimeout(() => setState(false), 1000);
  };

  return (
    <Form {...args} onSubmit={onSubmit} defaultValues={{ firstName: "", email: "" }}>
      <Stacks direction="column" gap={16}>
        <Controller
          name="firstName"
          rules={{ required: "Имя обязательно" }}
          render={({ field }) => <Input {...field} placeholder="Имя" />}
        />
        <Controller
          name="email"
          rules={{
            required: "Email обязателен",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Некорректный email",
            },
          }}
          render={({ field }) => <Input {...field} placeholder="Email" />}
        />
        <Button label="Отправить" type="submit" variant="primary" loading={state} />
      </Stacks>
    </Form>
  );
};
