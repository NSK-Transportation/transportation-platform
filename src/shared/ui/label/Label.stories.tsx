import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { Input } from "../input/Input";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["up", "down", "left", "right"],
    },
  },
  args: {
    direction: "up",
    text: "Здесь могла быть ваша реклама",
    className: "",
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithChildren: Story = {
  args: {
    children: <Input placeholder="Введите имя" />,
  },
};

export const Default: Story = {
  args: {},
};
