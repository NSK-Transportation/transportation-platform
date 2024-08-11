import { Meta, StoryFn } from "@storybook/react";
import { Grid, GridProps } from "./Grid";

const meta: Meta<typeof Grid> = {
  title: "Components/Grid ",
  component: Grid,
  argTypes: {
    fullWidth: { control: "boolean" },
    className: { control: "text" },
  },
  args: {
    fullWidth: false,
    className: "",
  },
};

export default meta;

export const Default: StoryFn<GridProps> = (_args) => {
  return (
    <Grid container fullWidth gap="20px">
      <Grid columns="repeat(2, 1fr)" gap="10px">
        <div>Nested Item 1</div>
        <div>Nested Item 2</div>
      </Grid>
      <div>Item 3</div>
      <div>Item 4</div>
    </Grid>
  );
};
