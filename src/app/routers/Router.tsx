import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "@/pages";
import { SaleTicket } from "@/pages/home/components/mainPanel";
// import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/home/*" element={<Home />}>
        <Route path="sale-ticket" element={<SaleTicket />} />
      </Route>

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
