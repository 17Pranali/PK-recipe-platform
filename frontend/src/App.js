import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetail from "./pages/RecipeDetail";
import AddRecipeForm from "./components/AddRecipeForm";
import About from "./pages/About";
import RecipesByCategory from "./pages/RecipesByCategory";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
       <Route path="/" element={<Home />} />
  <Route path="/recipe/:id" element={<RecipeDetail />} />
  <Route path="/add" element={<AddRecipeForm />} />
  <Route path="/about" element={<About />} />
  <Route path="/category/:category" element={<RecipesByCategory />} />

      </Routes>
    </Router>
  );
}
export default App;
