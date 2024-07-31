import { Meta, StoryFn } from "@storybook/react";
import { Divider, DividerProps } from "./Divider";
import { Stacks } from "../stacks/Stacks";
import { Typography } from "../typography/Typography";
import { Button } from "../button/Button";
import { AiFillAliwangwang } from "react-icons/ai";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
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

export const Horizontal: StoryFn<DividerProps> = (args) => {
  return (
    <Stacks gap={16} direction="column">
      <Typography variant="h3">Текст сверху</Typography>
      <Divider {...args} />
      <Typography variant="h3">Текст снизу</Typography>
    </Stacks>
  );
};

export const Vertical: StoryFn<DividerProps> = (args) => {
  return (
    <Stacks gap={16}>
      <Button size="icon" label={<AiFillAliwangwang />} />
      <Divider {...args} orientation="vertical" />
      <Button label="Фильтр" />
    </Stacks>
  );
};
