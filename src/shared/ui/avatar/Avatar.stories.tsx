import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { AiFillAliwangwang } from "react-icons/ai";

const meta: Meta<typeof Avatar> = {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["small", "medium", "large"],
    },
    alt: {
      description: "Если нет IMG, вставьте ALT",
    },
    src: {
      description: "Вставьте сюда URL или локальный IMG",
    },
    icon: {
      description: "Если нет IMG, вставьте ICON",
    },
    className: {
      description: "Дополнительные стили",
    },
  },
  args: {
    size: "large",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithIcon: Story = {
  args: {
    src: undefined,
    icon: <AiFillAliwangwang />,
  },
};

export const WithImg: Story = {
  args: {
    src: "https://static.tildacdn.com/tild6330-3038-4061-a462-366633636430/__2.jpg",
  },
};

export const WithFirstLetter: Story = {
  args: {
    src: undefined,
    alt: "John Doe",
  },
};
