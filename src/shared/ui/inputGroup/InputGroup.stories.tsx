import type { Meta, StoryObj } from "@storybook/react";
import { InputGroup } from "./InputGroup";
import { Input } from "../input/Input";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
  },
  args: {
    fullWidth: false,
    size: "small",
    className: "",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "small",
    children: [
      <Input key="1" placeholder="Input 1" />,
      <Input key="2" placeholder="Input 2" />,
      <Input key="3" placeholder="Input 3" />,
    ],
  },
};
