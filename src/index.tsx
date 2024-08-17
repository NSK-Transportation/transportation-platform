import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";

import "./app/styles/global.css";
import "./app/styles/reset.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <App />
      </Suspense>
    </BrowserRouter>
  // </React.StrictMode>
);
