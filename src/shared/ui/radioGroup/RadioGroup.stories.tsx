import { Meta, StoryFn } from "@storybook/react";
import { RadioGroup, RadioGroupProps } from "./RadioGroup";
import { useState } from "react";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  argTypes: {
    name: { control: "text" },
    radios: { control: "object" },
    selected: { control: "text" },
    onChange: { action: "onChange" },
    className: { control: "text" },
  },
  args: {
    className: "",
  },
};

export default meta;

export const Default: StoryFn<RadioGroupProps> = () => {
  const [selectedRadio, setSelectedRadio] = useState("");

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
  };

  return (
    <RadioGroup
      name="radiosss"
      radios={[
        { value: "full", title: "Скидка 100%" },
        { value: "half", title: "Скидка 50%" },
        { value: "none", title: "Без скидки" },
      ]}
      selected={selectedRadio}
      onChange={handleRadioChange}
      direction={undefined}
    />
  );
};
