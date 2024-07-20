import { Meta, StoryFn } from "@storybook/react";
import { Switch, SwitchProps } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  argTypes: {
    disabled: { type: "boolean" },
    label: { control: "text" },
    checked: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    disabled: false,
    label: "Toggle me",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<SwitchProps> = (args) => {
  return <Switch {...args} />;
};
