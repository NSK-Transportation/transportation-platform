import type { Preview } from "@storybook/react";
import { background, themes } from "@storybook/theming";
import doc from "./doc.mdx";

import "../src/app/styles/global.css";

const preview: Preview = {
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
        ...themes.dark,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
