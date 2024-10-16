import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
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
    label: "Radio",
    className: "",
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
