import React from "react";
import type { Preview } from "@storybook/react";
import { background, themes } from "@storybook/theming";
import doc from "./doc.mdx";

import "../src/app/styles/global.css";
import { MemoryRouter } from "react-router-dom";

const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  parameters: {
    background: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#f6f6f6",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    docs: {
      page: doc,
      theme: {
        ...themes.light,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
