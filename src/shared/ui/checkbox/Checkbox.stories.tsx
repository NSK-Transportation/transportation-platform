import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: { type: "boolean" },
    direction: {
      control: { type: "radio" },
      options: ["row", "column"],
    },
  },
  args: {
    disabled: false,
    direction: "row",
    label: "Checkbox",
    className: "",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
