import React, { useState } from "react";
import { RecipeModal } from "../components/Recipe-modal";

interface Recipe {
  photoUrl: string;
  title: string;
  description?: string;
  directions?: string;
  calories?: string;
  cookTime?: string;
  ingredients?: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col max-w-sm h-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" className="h-2/5">
          <img
            className="rounded-t-lg w-full h-full object-cover"
            src={recipe.photoUrl}
            alt={recipe.title}
          />
        </a>
        <div className="p-5 flex flex-col h-full">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {recipe.title}
            </h5>
          </a>
          <p
            className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {recipe.description || "No description available."}
          </p>
          <div className="mt-auto flex justify-end">
            <button
              onClick={openModal}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RecipeModal
          recipe={recipe}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
}
