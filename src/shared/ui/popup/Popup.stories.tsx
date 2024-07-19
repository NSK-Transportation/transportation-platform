import { RefAttributes, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Popup, PopupProps } from "./Popup";
import { BsTicketDetailed } from "react-icons/bs";
import { JSX } from "react/jsx-runtime";
import { Input } from "../input/Input";
import { Label } from "../label/Label";
import { Button } from "../button/Button";

const meta: Meta<typeof Popup> = {
  title: "Components/Popup (In Progress)",
  component: Popup,
  parameters: {
    layout: "centered",
  },
  tags: ["dev"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "onClose" },
    className: { control: "text" },
    children: { control: "object" },
  },
  args: {
    isOpen: false,
    onClose: () => {},
    children: (
      <>
        <Label text="Введите ваше имя">
          <Input placeholder="Имя" />
        </Label>
      </>
    ),
    className: "",
  },
};

export default meta;

export const Default: StoryFn<PopupProps> = (
  args: JSX.IntrinsicAttributes & PopupProps & RefAttributes<HTMLDivElement>,
) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button label="Открыть popup" onClick={() => setIsOpen(true)} />
      <Popup {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const WithIcon: StoryFn<PopupProps> = (
  args: JSX.IntrinsicAttributes & PopupProps & RefAttributes<HTMLDivElement>,
) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button label="Открыть popup" onClick={() => setIsOpen(true)} />
      <Popup
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        icon={<BsTicketDetailed />}
      />
    </>
  );
};
