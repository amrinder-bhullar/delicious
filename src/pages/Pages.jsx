import Home from "./Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Cusine from "./Cusine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";

function Pages() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
        <Route path="/Cusine/:type" element={<Cusine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
