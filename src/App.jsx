/** @format */

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";
import NerbyRestaurant from "./pages/NerbyRestaurant";
import RootLayout from "./components/ui/RootLayout";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/NerbyRestaurant" element={<NerbyRestaurant />} />
        <Route path="/Favorites" element={<Favorites />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
