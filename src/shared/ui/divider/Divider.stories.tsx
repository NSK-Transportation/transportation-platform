import { Meta, StoryFn } from "@storybook/react";
import { Divider, DividerProps } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    className: { control: "text" },
  },
  args: {
    orientation: "horizontal",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<DividerProps> = (args) => <Divider {...args} />;
