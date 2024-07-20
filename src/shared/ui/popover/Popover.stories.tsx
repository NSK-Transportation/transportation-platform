import { Meta, StoryFn } from "@storybook/react";
import { Popover, PopoverProps } from "./Popover";
import { Button } from "../button/Button";
import { Input } from "../input/Input";
import { IoIosSettings } from "react-icons/io";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  argTypes: {
    placement: {
      control: { type: "radio" },
      options: ["left", "right", "top", "bottom"],
    },
    trigger: { control: "object" },
    actions: { control: "object" },
    className: { control: "text" },
  },
  args: {
    placement: "bottom",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<PopoverProps> = (args) => {
  const { trigger, ...restArgs } = args;

  return (
    <Popover trigger={<Button label="Popover" />} {...restArgs}>
      <Input placeholder="Имя" />
      <Input placeholder="Фамилия" />
      <Input type="date" placeholder="Год рождения" />
    </Popover>
  );
};

export const WithActions: StoryFn<PopoverProps> = (args) => {
  const { trigger, ...restArgs } = args;
  return (
    <Popover
      trigger={<Button label="Popover" />}
      actions={
        <>
          <Button label="Кнопка 1" fullWidth />
          <Button label="Кнопка 2" fullWidth />
        </>
      }
      {...restArgs}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="s36" label={<IoIosSettings size={24} />} />
        <Button size="s36" label={<IoIosSettings size={24} />} />
        <Button size="s36" label={<IoIosSettings size={24} />} />
      </div>
    </Popover>
  );
};
