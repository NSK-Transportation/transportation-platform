import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "@/pages";
// import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      {/* <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        }
      /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
