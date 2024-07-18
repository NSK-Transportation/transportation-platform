import { Meta, StoryFn } from "@storybook/react";
import { Breadcrumb, BreadcrumbProps } from "./Breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    items: { control: "object" },
    className: { control: "text" },
  },
  args: {
    items: [],
    className: "",
  },
};

export default meta;

export const Default: StoryFn<BreadcrumbProps> = () => {
  const items = [
    { label: "Home", href: "" },
    { label: "Products", href: "" },
    { label: "Electronics", href: "" },
  ];

  return <Breadcrumb items={items} />;
};
