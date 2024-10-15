import { createBrowserRouter } from "react-router-dom";
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { App } from "@/app/App";
import { ExtraBaggage } from "@/pages/ExtraBaggage";
import { Home } from "@/pages/Home";
import { InformationWindow } from "@/pages/InformationWindow";
import { Login } from "@/pages/Login";
import { ManagementWay } from "@/pages/ManagementWay";
import { NotFound } from "@/pages/NotFound";
import { RefundTicket } from "@/pages/RefundTicket";
import { SaleTicket } from "@/pages/SaleTicket";
import { ROUTES } from "@/shared/config";

export const router = createBrowserRouter([
  {
    path: ROUTES.app,
    element: <App />,
    children: [
      {
        path: ROUTES.home.route,
        element: <Home />,
        children: [
          {
            path: ROUTES.home.saleTicket.route,
            element: <SaleTicket />,
          },
          {
            path: ROUTES.home.extraBaggage.route,
            element: <ExtraBaggage />,
          },
          {
            path: ROUTES.home.refundTicket.route,
            element: <RefundTicket />,
          },
          {
            path: ROUTES.home.wayManagement.route,
            element: <ManagementWay />,
          },
        ],
      },

      {
        path: ROUTES.informationWindow.route,
        element: <InformationWindow />,
      },

      {
        path: ROUTES.login.route,
        element: <Login />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
