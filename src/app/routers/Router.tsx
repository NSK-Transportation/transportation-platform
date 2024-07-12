import { Routes, Route } from "react-router-dom";

import { Home } from "../../pages/home";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};

export default Router;
