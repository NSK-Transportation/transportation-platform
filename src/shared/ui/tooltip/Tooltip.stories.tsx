import { Meta, StoryFn } from "@storybook/react";
import { Tooltip, TooltipProps } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["up", "down", "left", "right"],
    },
  },
  args: {
    direction: "up",
    text: "Text tooltip",
    children: "Tooltip",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<TooltipProps> = (args) => {
  return <Tooltip {...args}>{args.children}</Tooltip>;
};
