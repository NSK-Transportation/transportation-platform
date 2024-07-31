import { Meta, StoryFn } from "@storybook/react";
import { Time, TimeProps } from "./Time";

const meta: Meta<typeof Time> = {
  title: "Components/Time",
  component: Time,
  argTypes: {
    className: { control: "text" },
  },
  args: {
    className: "",
  },
};

export default meta;

export const Default: StoryFn<TimeProps> = (args) => {
  return <Time {...args} />;
};
