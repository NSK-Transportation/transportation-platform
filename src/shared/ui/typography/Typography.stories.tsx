import { Meta, StoryFn } from "@storybook/react";
import { Typography, TypographyProps } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "caption", "span"],
    },
    color: {
      control: { type: "radio" },
      options: ["default", "primary", "secondary", "success", "error", "warning", "info"],
    },
    align: {
      control: { type: "text" },
    },
    weight: {
      control: { type: "text" },
    },
    size: {
      control: { type: "text" },
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    variant: "span",
    color: "default",
    align: "left",
    weight: "normal",
    size: "16px",
    children: "Этот текст изменяется / This is text too",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<TypographyProps> = (args) => {
  return <Typography {...args}>{args.children}</Typography>;
};
