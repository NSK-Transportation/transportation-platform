import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      options: ["default", "active"],
    },
  },
  args: {
    variant: "default",
    className: "",
    placeholder: "text",
    options: [{
      label:"item1",
      value:"",
    },
    {
      label:"item2",
      value:""
    },
    {
      label:"item3",
      value:""
    },
    {
      label:"item4",
      value:""
    },
    {
      label:"item5",
      value:""
    },
  ]
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};
