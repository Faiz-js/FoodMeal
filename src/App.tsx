import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodDetail from "./pages/FoodDetail";
import SearchedFood from "./pages/SearchedFood";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/foodDetails/:idMeal" element={<FoodDetail />} />
        <Route path="/search/:query" element={<SearchedFood />} />
      </Routes>
    </BrowserRouter>
  );
}
