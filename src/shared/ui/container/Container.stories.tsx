import { Meta, StoryFn } from "@storybook/react";
import { Container, ContainerProps } from "./Container";
import { Box } from "../box/Box";
import { Typography } from "../typography/Typography";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  argTypes: {
    variant: {
      control: { type: "radio" },
      options: ["xsm-768", "sm-1200", "md-1440", "lg-1920", "fullWidth"],
    },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    variant: "sm-1200",
    children: "",
    className: "",
  },
};

export default meta;

export const Default: StoryFn<ContainerProps> = (args) => {
  return (
    <Container {...args}>
      <Box>
        <Typography>Container</Typography>
      </Box>
    </Container>
  );
};
