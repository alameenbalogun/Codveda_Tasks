import React, { useState } from "react";
import { Search, ChefHat } from "lucide-react";

export function SearchBar({ onSearch, loading }) {
  const [ingredient, setIngredient] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onSearch(ingredient.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-beige-200 overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:ring-2 focus-within:ring-orange-400 focus-within:ring-opacity-50">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-beige-400" />
          </div>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Search recipes by ingredient (e.g., chicken, tomato, beef)..."
            className="block w-full pl-12 pr-36 py-4 text-gray-800 placeholder-beige-400 bg-transparent focus:outline-none text-lg font-medium"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !ingredient.trim()}
            className="absolute inset-y-0 right-0 flex items-center px-8 m-2 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <ChefHat className="h-5 w-5" />
                <span>Search</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
