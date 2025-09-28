import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddRecipeForm.css";

function AddRecipeForm() {
  const [recipe, setRecipe] = useState({
    title: "",
    description: "",
    category: "",
    ingredients: "",
    steps: ""
  });
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(recipe).forEach(key => formData.append(key, recipe[key]));
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/recipes", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Recipe Added!");
      setRecipe({ title: "", description: "", videoUrl: "", category: "", ingredients: "", steps: "" });
      setImage(null);
      navigate("/"); // optional: go to home
    } catch (err) {
      console.error(err);
      alert("Error adding recipe");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Add Recipe</h2>
      <input type="text" name="title" placeholder="Title" value={recipe.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={recipe.description} onChange={handleChange} required />
      <input type="file" accept="image/*" onChange={handleImageChange} required />
      
      
      {/* Category dropdown */}
      <select name="category" value={recipe.category} onChange={handleChange} required>
        <option value="">-- Select Category --</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Dessert">Dessert</option>
      </select>

      <textarea name="ingredients" placeholder="Ingredients (comma separated)" value={recipe.ingredients} onChange={handleChange} required />
      <textarea name="steps" placeholder="Steps" value={recipe.steps} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddRecipeForm;
