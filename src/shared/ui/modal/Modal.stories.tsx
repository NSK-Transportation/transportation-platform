import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../button/Button";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    onClose: { action: "onClose" },
    className: { control: "text" },
    direction: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    actions: { control: "object" },
    children: { control: "text" },
  },
  args: {
    isOpen: false,
    direction: "right",
    children: "Modal",
    actions: [
      <Button label="Отмена" key="1" fullWidth />,
      <Button label="Сохранить" key="2" fullWidth />,
    ],
    className: "",
  },
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
