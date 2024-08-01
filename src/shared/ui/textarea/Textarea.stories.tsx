import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
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
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
