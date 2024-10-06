module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "plugin:@conarti/feature-sliced/recommended",
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "jsx-a11y", "prettier", "import"],
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    quotes: "off",
    "linebreak-style": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx", ".ts"],
      },
    ],
  },
  globals: {
    React: "readonly",
    ReactDOM: "readonly",
  },
  overrides: [
    {
      files: ["**/*.stories.@(js|jsx|ts|tsx)"],
      rules: {
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
};
