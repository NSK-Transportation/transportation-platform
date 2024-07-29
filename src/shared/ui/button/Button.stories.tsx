import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
import { Fa42Group, FaS } from "react-icons/fa6";
import { AiFillAliwangwang } from "react-icons/ai";
import { Box } from "../box/Box";
import { Stacks } from "../stacks/Stacks";
import { Label } from "../label/Label";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "link", "danger"],
    },
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large", "icon"],
    },
    justifyContent: {
      control: { type: "radio" },
      options: ["center", "start", "end"],
    },
    label: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    variant: "primary",
    size: "medium",
    justifyContent: "center",
    label: "Button",
    fullWidth: false,
    disabled: false,
    loading: false,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<ButtonProps> = (args) => {
  return <Button {...args} />;
};

export const WithBoxAndJustifyContent: StoryFn<ButtonProps> = (args) => {
  return (
    <>
      <Box color="blue" fullWidth>
        <Stacks direction="column" gap={16} fullwidth>
          <Button {...args} />
        </Stacks>
      </Box>
    </>
  );
};

export const Icon: StoryFn<ButtonProps> = (args) => {
  return <Button {...args} size="icon" label={<AiFillAliwangwang />} />;
};
