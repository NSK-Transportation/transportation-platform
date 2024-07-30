import { Meta, StoryFn } from "@storybook/react";
import { Image, ImageProps } from "./Image";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  argTypes: {
    src: { control: "text" },
    alt: { control: "text" },
    objectFit: { control: "radio", options: ["contain", "cover", "fill", "none", "scale-down"] },
    size: { control: "text" },
    className: { control: "text" },
  },
  args: {
    src: "https://placehold.co/250x250",
    alt: "image",
    objectFit: "cover",
    size: "100%",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<ImageProps> = (args) => {
  return <Image {...args} />;
};
