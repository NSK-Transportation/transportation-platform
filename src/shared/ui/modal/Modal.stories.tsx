import { Meta, StoryFn } from "@storybook/react";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { useState } from "react";
import { Stacks } from "../stacks/Stacks";
import { Textarea } from "../textarea/Textarea";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    isOpen: { control: "boolean" },
    className: { control: "text" },
    direction: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
    actions: { control: "object" },
    children: { control: "text" },
  },
  args: {
    className: "",
  },
};

export default meta;

export const Default: StoryFn<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Открыть" onClick={() => setIsOpen(!isOpen)}>
        Open Modal
      </Button>
      <Modal
        {...args}
        isOpen={isOpen}
        actions={
          <>
            <Button
              label="Отмена"
              variant="secondary"
              fullWidth
              onClick={() => setIsOpen(!isOpen)}
            />
            <Button label="Сохранить" fullWidth />
          </>
        }
      >
        <Stacks direction="column" gap={16}>
          <Input placeholder="Имя" />
          <Input placeholder="ID водителя" />
          <Textarea placeholder="Сообщение" />
        </Stacks>
      </Modal>
    </>
  );
};
