package com.example.recipes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.recipes.model.Recipe;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    List<Recipe> findByCategory(String category);
}
