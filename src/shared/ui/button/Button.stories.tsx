import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["default", "primary", "secondary", "link", "danger"],
    },
    disabled: { type: "boolean" },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large", "s48", "icon"],
    },
  },
  args: {
    disabled: false,
    label: "Button",
    variant: "primary",
    size: "medium",
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

// export const Primary: Story = {
//   args: {
//     variant: "primary",
//   },
// };

// export const Secondary: Story = {
//   args: {
//     variant: "secondary",
//   },
// };

// export const Link: Story = {
//   args: {
//     variant: "link",
//   },
// };

// export const Danger: Story = {
//   args: {
//     variant: "danger",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//   },
// };
