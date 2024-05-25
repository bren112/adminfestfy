import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageBase />}>
          <Route index element={<Home />}></Route>
             </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
