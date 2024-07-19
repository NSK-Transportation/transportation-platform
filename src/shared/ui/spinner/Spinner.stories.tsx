import { Meta, StoryFn } from "@storybook/react";
import { Spinner, SpinnerProps } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  parameters: {
    layout: "centered",
  },
  tags: ["dev"],
  argTypes: {
    size: { control: "radio", options: ["small", "medium"] },
    className: { control: "text" },
  },
  args: {
    size: "medium",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<SpinnerProps> = (args) => <Spinner {...args} />;
