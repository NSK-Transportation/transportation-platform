import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { BiShow } from "react-icons/bi";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    disabled: { type: "boolean" },
    variant: {
      control: { type: "radio" },
      options: ["default", "error", "success", "warning"],
    },
  },
  args: {
    disabled: false,
    variant: "default",
    placeholder: "Placeholder",
    className: "",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const WithSlots: Story = {
  args: {
    slots: <BiShow />,
    variant: "default",
  },
};
