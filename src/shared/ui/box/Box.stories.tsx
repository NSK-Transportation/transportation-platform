import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";
import { Select } from "../select/Select";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["up", "down", "left", "right","center"],
    },
    border:{
      control: {type: "radio" },
      options: ["right","left","up","down"],
    },
    color:{
      control: { type: "radio" },
      options: ["blue", "white"],
    },
  },

} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithChildren: Story = {
  args: {
    children: <Select placeholder="Выберите платформу" options={[{
      label:"Объявят перед посадкой",
      value:"",
    },
    {
      label:"Платформа 1",
      value:""
    },
    {
      label:"Платформа 2",
      value:""
    },
    {
      label:"Платформа 3",
      value:""
    },
  ]} />,
},
};
