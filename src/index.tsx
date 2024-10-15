import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/providers/router";
import { ToastOptions } from "./shared/config";
import { Spinner } from "./shared/ui/index.ts";

const root = document.getElementById("root");

const container = createRoot(root as HTMLElement);

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Suspense fallback="Loading...">
        <RouterProvider router={router} fallbackElement={<Spinner />} />
        <Toaster toastOptions={ToastOptions} />
      </Suspense>
    </QueryClientProvider>,
  );
});
