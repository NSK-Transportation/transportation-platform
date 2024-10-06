import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";

import "./app/styles/global.css";
import "./app/styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </BrowserRouter>,
  // </React.StrictMode>
);
