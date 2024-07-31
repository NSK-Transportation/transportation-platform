import { Meta, StoryFn } from "@storybook/react";
import { User, UserProps } from "./User";

const meta: Meta<typeof User> = {
  title: "Components/User",
  component: User,
  argTypes: {
    avatar: {
      control: { type: "object" },
      size: {
        control: { type: "radio" },
        options: ["small", "medium", "large"],
      },
      src: {
        control: { type: "text" },
        description: "Вставьте сюда URL или локальный IMG",
      },
      alt: {
        control: { type: "text" },
        description: "Если нет IMG, вставьте ALT",
      },
      icon: {
        control: { type: "text" },
        description: "Если нет IMG, вставьте ICON",
      },
    },
    name: { control: "text" },
    description: { control: "text" },
    className: { control: "text" },
  },
  args: {
    name: "Михаил Михаилович",
    description: "ID: 000000",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<UserProps> = (args) => {
  return (
    <User
      {...args}
      avatar={{ src: "https://static.tildacdn.com/tild6330-3038-4061-a462-366633636430/__2.jpg" }}
    />
  );
};
