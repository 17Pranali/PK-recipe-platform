import React from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css"; // import CSS

function RecipeCard({ recipe }) {
  const imageSrc = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `http://localhost:8080${recipe.imageUrl}`;

  return (
    <div className="recipe-card">
      <img src={imageSrc} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.category}</p>
      <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
    </div>
  );
}

export default RecipeCard;
