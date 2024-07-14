import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "multi-select" },
      options: ["default", "primary", "secondary", "link", "danger"],
    },
    size: {
      control: { type: "multi-select" },
      options: ["small", "medium", "large", "s48", "icon"],
    },
  },
  args: {
    label: "Button",
    variant: "primary",
    size: "medium",
    className: "",
    onClick: action("clicked"),
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
