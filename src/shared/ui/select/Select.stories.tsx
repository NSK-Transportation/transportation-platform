import { Meta, StoryFn } from "@storybook/react";
import { Select, SelectProps } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select ",
  component: Select,
  argTypes: {
    options: { control: "object" },
    fullWidth: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    options: [],
    fullWidth: false,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<SelectProps> = (_args) => {
  return (
    <Select
      defaultValue="1"
      options={[
        { value: "1", label: "One" },
        { value: "2", label: "Two" },
        { value: "3", label: "Three" },
      ]}
    />
  );
};
