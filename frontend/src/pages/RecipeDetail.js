import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // <-- import useNavigate
import axios from "axios";
import "./RecipeDetail.css";
function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/recipes/${id}`)
      .then(res => setRecipe(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  const imageSrc = recipe.imageUrl.startsWith("http")
    ? recipe.imageUrl
    : `http://localhost:8080${recipe.imageUrl}`;

  const videoSrc = recipe.videoUrl
    ? recipe.videoUrl.includes("youtube.com/watch")
      ? recipe.videoUrl.replace("watch?v=", "embed/")
      : recipe.videoUrl
    : null;

  return (
    <div className="recipe-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      <h1>{recipe.title}</h1>
      <img src={imageSrc} alt={recipe.title} />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>

      {videoSrc && (
        <div className="video">
          <iframe
            width="100%"
            height="400"
            src={videoSrc}
            title="Recipe Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}


export default RecipeDetail;
