import { Routes, Route } from "react-router-dom";
import { Home, NotFound } from "@/pages";
  
export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
