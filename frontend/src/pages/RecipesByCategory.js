import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

function RecipesByCategory() {
  const { category } = useParams(); // category from URL like /category/Breakfast
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/recipes")
      .then(res => setRecipes(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filter recipes by category (case-insensitive)
  const filteredRecipes = recipes.filter(
    r => r.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="home">
      <h1>{category} Recipes</h1>
      {filteredRecipes.length === 0 ? (
        <p>No recipes found in this category.</p>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipesByCategory;
