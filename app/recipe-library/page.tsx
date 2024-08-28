"use client";

import { useState, useEffect } from "react";
import { RecipeCard } from "../components/Recipe-card";


interface Recipe {
  photoUrl: string;
  title: string;
  description?: string;
  directions?: string;
  calories?: string;
  cookTime?: string;
  ingredients?: string;
}


export default function RecipeLibrary() {
  const [currentPage, setCurrentPage] = useState(1);
  const [initialRecipes, setInitialRecipes] = useState<Recipe[]>([]);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.sampleapis.com/recipes/recipes");
        const recipes = await res.json();

        setInitialRecipes(recipes.map((recipe: any) => ({
          photoUrl: recipe.photoUrl || "default-image-url",
          title: recipe.title,
          description: recipe.description,
          directions: recipe.directions,
          calories: recipe.calories,
          cookTime: recipe.cookTime,
          ingredients: recipe.ingredients
        })));
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setInitialRecipes([]);
      }
    }

    fetchData();
  }, []);

  const paginatedRecipes = initialRecipes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(initialRecipes.length / itemsPerPage);

  return (
    <div className="p-4 bg-white">
      <h1 className="text-2xl font-bold mb-4">Recipe Library</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`rounded-lg px-4 py-2 border mx-1 ${currentPage === i + 1 ? 'bg-blue-700 text-white' : ''}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
