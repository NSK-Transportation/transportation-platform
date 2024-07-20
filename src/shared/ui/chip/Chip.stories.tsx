import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "info", "success", "error", "warning"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
  args: {
    label: "Отправлен",
    variant: "info",
    size: "medium",
    className: "",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
