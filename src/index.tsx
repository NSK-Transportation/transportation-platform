import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import { ToastOptions } from "./shared/config";

import "./app/styles/global.css";
import "./app/styles/reset.css";

const root = document.getElementById("root");

const container = createRoot(root as HTMLElement);

async function deferRender() {
  if (import.meta.env.MODE !== "development") {
    return;
  }
  console.log(
    `%c${import.meta.env.MODE}`,
    "color: yellow; font-style: italic; background-color: blue;padding: 2px",
  );

  const { worker } = await import("./app/msw/browser.ts");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

deferRender().then(() => {
  container.render(
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <App />
        <Toaster toastOptions={ToastOptions} />
      </Suspense>
    </BrowserRouter>,
  );
});
