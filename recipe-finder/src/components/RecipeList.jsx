import React from "react";
import { RecipeCard } from "./RecipeCard";
import { ChefHat, Search } from "lucide-react";

export function RecipeList({
  recipes,
  favorites,
  onToggleFavorite,
  onViewRecipe,
  loading,
  error,
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-6">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-beige-200 border-t-orange-500"></div>
          <ChefHat className="absolute inset-0 m-auto h-8 w-8 text-orange-500 animate-pulse" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          Cooking up something delicious...
        </h3>
        <p className="text-beige-500 text-lg">
          Searching for the perfect recipes
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-red-700 font-semibold text-xl mb-3">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-beige-50 to-orange-50 border border-beige-200 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
          <Search className="h-16 w-16 text-beige-400 mx-auto mb-4" />
          <h3 className="text-gray-700 font-semibold text-xl mb-3">
            Ready to cook something amazing?
          </h3>
          <p className="text-beige-600 leading-relaxed">
            Search for recipes by entering your favorite ingredient above!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        <span className="bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
          Found {recipes.length} delicious recipe
          {recipes.length !== 1 ? "s" : ""}
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            isFavorite={favorites.some((fav) => fav.idMeal === recipe.idMeal)}
            onToggleFavorite={onToggleFavorite}
            onViewRecipe={onViewRecipe}
          />
        ))}
      </div>
    </div>
  );
}
