import React from "react";
import { Heart, Eye, Clock } from "lucide-react";

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onViewRecipe,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group transform hover:-translate-y-2 border border-beige-100">
      <div className="relative overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={() => onToggleFavorite(recipe)}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg ${
            isFavorite
              ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
              : "bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-300">
          {recipe.strMeal}
        </h3>
        <div className="flex items-center text-sm text-beige-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>Ready in 30 mins</span>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onViewRecipe(recipe)}
            className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Recipe
          </button>
          <button
            onClick={() => onToggleFavorite(recipe)}
            className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 ${
              isFavorite
                ? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
