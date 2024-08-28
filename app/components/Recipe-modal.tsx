import React from "react";

interface Recipe {
  title: string;
  description?: string;
  directions?: string;
  calories?: string;
  cookTime?: string;
  ingredients?: string;
}

interface RecipeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeModal({ recipe, isOpen, onClose }: RecipeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-full overflow-y-scroll	">
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <p className="text-gray-700 mb-4"><strong>Description:</strong> {recipe.description || "No description available."}</p>
        <p className="text-gray-700 mb-4"><strong>Directions:</strong> {recipe.directions || "No directions available."}</p>
        <p className="text-gray-700 mb-4"><strong>Ingredients:</strong> {recipe.ingredients || "No data available."}</p>
        <p className="text-gray-700 mb-4"><strong>Calories:</strong> {recipe.calories || ""}</p>
        <p className="text-gray-700 mb-4"><strong>Cook Time:</strong> {recipe.cookTime || ""}</p>
        <button
          onClick={onClose}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}
