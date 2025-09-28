package com.example.recipes.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.recipes.model.Recipe;
import com.example.recipes.repository.RecipeRepository;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:3000")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    // GET all recipes
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // GET recipe by ID
    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeRepository.findById(id);
        return recipe.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // POST recipe (file upload)
    @PostMapping(consumes = {"multipart/form-data"})
    public Recipe addRecipe(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam(required = false) String videoUrl,
            @RequestParam String ingredients,
            @RequestParam String steps,
            @RequestParam("image") MultipartFile image) throws Exception {

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path filePath = Paths.get("uploads/", fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, image.getBytes());

        Recipe recipe = new Recipe();
        recipe.setTitle(title);
        recipe.setDescription(description);
        recipe.setCategory(category);
        
        recipe.setIngredients(ingredients);
        recipe.setSteps(steps);
        recipe.setImageUrl("/uploads/" + fileName);

        return recipeRepository.save(recipe);
    }
}
