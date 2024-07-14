import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../button/Button";

const meta: Meta<typeof ButtonGroup> = {
  title: "ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "small",
    children: [
      <Button key="1" label="Button 1" variant="default" />,
      <Button key="2" label="Button 2" variant="default" />,
      <Button key="3" label="Button 3" variant="default" />,
    ],
  },
};
