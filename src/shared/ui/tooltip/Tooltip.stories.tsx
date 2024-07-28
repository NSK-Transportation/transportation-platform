import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
// import { Input } from "../input/Input";
// import { Checkbox } from "../checkbox/Checkbox";
import { Box } from "../box/Box";
import { ButtonGroup } from "../buttonGroup/ButtonGroup";
import { Button } from "../button/Button";

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
    text: "валпщвапл",
    className: "",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithChildren: Story = {
  args: {
    children: <Button label="gggg"  />,
  },
};
