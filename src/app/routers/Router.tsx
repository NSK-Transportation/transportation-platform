import { Routes, Route } from "react-router-dom";

import { Home } from "../../pages/home";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="*" element={"404"} />
    </Routes>
  );
};

export default Router;
