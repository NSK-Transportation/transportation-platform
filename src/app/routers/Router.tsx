import { Routes, Route } from "react-router-dom";
import { ExtraBaggage } from "@/pages/ExtraBaggage";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { ManagementWay } from "@/pages/ManagementWay";
import { NotFound } from "@/pages/NotFound";
import { RefundTicket } from "@/pages/RefundTicket";
import { SaleTicket } from "@/pages/SaleTicket";
// import { PrivateRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/home/*" element={<Home />}>
        <Route path="sale-ticket" element={<SaleTicket />} />
        <Route path="extra-baggage" element={<ExtraBaggage />} />
        <Route path="refund-ticket" element={<RefundTicket />} />
        <Route path="way-management" element={<ManagementWay />} />
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
      <Route path="/" element={<Login />} />
    </Routes>
  );
};
