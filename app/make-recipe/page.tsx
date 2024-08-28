"use client";

import { useRecoilState } from "recoil";
import { recipeState } from "../store/recipeState";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const recipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  ingredients: z.string().min(1, "Ingredients are required"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export default function MakeRecipe() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });
  const [recipes, setRecipes] = useRecoilState(recipeState);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const filteredRecipes = recipes
    .map((recipe, index) => ({ ...recipe, originalIndex: index }))
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleDelete = (originalIndex: number) => {
    setRecipes((oldRecipes) => oldRecipes.filter((_, i) => i !== originalIndex));
  };

  const handleEdit = (originalIndex: number) => {
    setModalOpen(true);
    setEditingIndex(originalIndex); // Track the index of the recipe being edited
    const recipe = recipes[originalIndex];
    reset(recipe);
  };

  const onSubmit = (data: RecipeFormData) => {
    if (editingIndex !== null) {
      // Edit mode: update the existing recipe
      setRecipes((oldRecipes) =>
        oldRecipes.map((recipe, index) =>
          index === editingIndex ? data : recipe
        )
      );
    } else {
      // Create mode: add a new recipe
      setRecipes((oldRecipes) => [...oldRecipes, data]);
    }
    setModalOpen(false);
    reset();
    setEditingIndex(null); // Reset editing index after save
  };

  return (
    <div className="p-4 bg-white">
      <div className="p-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search recipes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>

        <button
          className="block p-4 text-sm text-white border border-gray-300 rounded-lg bg-blue-700 focus:ring-blue-400 focus:border-blue-400 hover:bg-blue-400"
          onClick={() => {
            setModalOpen(true);
            setEditingIndex(null); // Reset editing index when creating a new recipe
          }}
        >
          Create a Recipe
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-6 rounded shadow-lg">
            <svg
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 w-6 h-6 text-gray-800 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label>Recipe Name</label>
                <input
                  className="border w-full p-2 mt-2"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label>Ingredients</label>
                <textarea
                  className="border w-full p-2 mt-2"
                  {...register("ingredients")}
                />
                {errors.ingredients && (
                  <p className="text-red-500">
                    {errors.ingredients?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                {editingIndex !== null ? "Update Recipe" : "Save Recipe"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 p-4">
        <h2 className="text-xl font-bold">My Recipes</h2>
        <ul>
          {filteredRecipes.map((recipe, index) => (
            <li key={index} className="border p-4 mb-4 rounded">
              <h3 className="text-lg font-semibold">{recipe.name}</h3>
              <p>{recipe.ingredients}</p>
              <div className="flex justify-end">
                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleDelete(recipe.originalIndex)}
                >
                  Delete
                </button>
                <button
                  className="text-blue-500 ml-4"
                  onClick={() => handleEdit(recipe.originalIndex)}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
