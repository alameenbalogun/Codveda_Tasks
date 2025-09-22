import React from "react";
import { Heart, X, Star, Eye } from "lucide-react";

export function FavoritesList({ favorites, onToggleFavorite, onViewRecipe }) {
  if (favorites.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="bg-gradient-to-br from-beige-50 to-pink-50 border border-beige-200 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
          <Heart className="h-16 w-16 text-beige-400 mx-auto mb-4" />
          <h3 className="text-gray-700 font-semibold text-xl mb-3">
            No favorites yet
          </h3>
          <p className="text-beige-600 leading-relaxed">
            Start searching and save recipes you love to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-3xl p-8 border border-pink-100 shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Star className="h-8 w-8 text-orange-500 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Your Favorite Recipes ({favorites.length})
          </span>
        </h2>
      </div>
      <div className="space-y-4">
        {favorites.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-beige-100 group"
          >
            <div className="flex items-center space-x-4">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-20 h-20 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-orange-600 transition-colors duration-300">
                  {recipe.strMeal}
                </h3>
                <p className="text-sm text-beige-500 mt-1">Ready in 30 mins</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onViewRecipe(recipe)}
                  className="p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
                  title="View recipe details"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onToggleFavorite(recipe)}
                  className="p-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 active:scale-95"
                  title="Remove from favorites"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
