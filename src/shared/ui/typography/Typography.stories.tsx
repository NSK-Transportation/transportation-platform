import { Meta, StoryFn } from "@storybook/react";
import { Typography, TypographyProps } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["h1", "h2", "h3", "body", "caption"],
    },
    color: {
      control: { type: "radio" },
      options: ["default", "primary", "secondary", "success", "error", "warning", "info"],
    },
    align: {
      control: { type: "radio" },
      options: ["left", "center", "right", "justify"],
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    variant: "body",
    color: "default",
    align: "left",
    children: "",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<TypographyProps> = (args) => {
  return <Typography {...args}>{args.children}</Typography>;
};
