import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import "./Home.css";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    axios.get("http://localhost:8080/api/recipes")
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  };

  const filteredRecipes = recipes.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
    || r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      <h1>🍴 All Recipes</h1>

      <input
        type="text"
        placeholder="Search by title or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "80%",
          maxWidth: "500px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <div className="recipe-grid">
        {filteredRecipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
}

export default Home;
