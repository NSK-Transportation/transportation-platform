import { Meta, StoryFn } from "@storybook/react";
import { Form, FormProps } from "./Form";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { Stacks } from "../stacks/Stacks";
import { Textarea } from "../textarea/Textarea";
import { BiShow } from "react-icons/bi";

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

export const Registration: StoryFn<FormProps<any>> = (args) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: any) => {
    setLoading(true);
    console.log(data);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Form {...args} onSubmit={onSubmit} defaultValues={{ username: "", email: "", password: "" }}>
      <Stacks direction="column" gap={16}>
        <Controller
          name="firstName"
          rules={{ required: "Имя пользователя обязательно" }}
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
        <Controller
          name="password"
          rules={{
            required: "Пароль обязателен",
            minLength: { value: 6, message: "Минимум 6 символов" },
          }}
          render={({ field }) => (
            <Input {...field} type="password" placeholder="Пароль" slots={<BiShow />} pointer/>
          )}
        />
        <Button label="Отправить" type="submit" variant="primary" loading={loading} />
      </Stacks>
    </Form>
  );
};

export const ContactForm: StoryFn<FormProps<any>> = (args) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log(data);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <Form {...args} onSubmit={onSubmit} defaultValues={{ name: "", email: "", message: "" }}>
      <Stacks direction="column" gap={16}>
        <Controller
          name="name"
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
        <Controller
          name="message"
          rules={{ required: "Сообщение обязательно" }}
          render={({ field }) => <Textarea {...field} placeholder="Сообщение" />}
        />
        <Button label="Отправить" type="submit" variant="primary" loading={isSubmitting} />
      </Stacks>
    </Form>
  );
};
