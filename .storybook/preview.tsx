import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import doc from "./doc.mdx";

import "../src/app/styles/global.css";

const preview: Preview = {
  parameters: {
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
