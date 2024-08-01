import { Meta, StoryFn } from "@storybook/react";
import { Stacks, StacksProps } from "./Stacks";

const meta: Meta<typeof Stacks> = {
  title: "Components/Stacks",
  component: Stacks,
  argTypes: {
    direction: { control: "radio", options: ["row", "columnS"] },
    gap: { control: "number" },
    alignItems: { control: "text" },
    justifyContent: { control: "text" },
    fullwidth: { control: "boolean" },
    fullheight: { control: "boolean" },
    children: { control: "object" },
    className: { control: "text" },
  },
  args: {
    direction: "row",
    gap: 8,
    alignItems: "start",
    justifyContent: "start",
    fullwidth: false,
    fullheight: false,
    children: "Stacks",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<StacksProps> = (args) => {
  const styled = {
    width: 40,
    height: 40,
    background: "#a3a3a3",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  };

  return (
    <Stacks {...args}>
      <div style={styled}>1</div>
      <div style={styled}>2</div>
      <div style={styled}>3</div>
      <div style={styled}>4</div>
      <div style={styled}>5</div>
      <div style={styled}>6</div>
    </Stacks>
  );
};
