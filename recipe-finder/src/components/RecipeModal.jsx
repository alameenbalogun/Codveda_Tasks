import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  Users,
  Globe,
  Youtube,
  ExternalLink,
  Heart,
} from "lucide-react";

export function RecipeModal({
  recipe,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  const [fullRecipe, setFullRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && recipe) {
      fetchFullRecipe(recipe.idMeal);
    }
  }, [isOpen, recipe]);

  const fetchFullRecipe = async (mealId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      if (data.meals && data.meals[0]) {
        setFullRecipe(data.meals[0]);
      }
    } catch (error) {
      console.error("Error fetching full recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const getIngredients = (recipe) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({
          ingredient: ingredient.trim(),
          measure: measure ? measure.trim() : "",
        });
      }
    }
    return ingredients;
  };

  const formatInstructions = (instructions) => {
    if (!instructions) return [];
    return instructions
      .split(/\r?\n/)
      .filter((step) => step.trim())
      .map((step) => step.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-beige-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 pr-4">
              {recipe?.strMeal}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleFavorite(recipe)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isFavorite
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-beige-200 border-t-orange-500"></div>
          </div>
        ) : fullRecipe ? (
          <div className="p-6">
            {/* Recipe Image and Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <img
                  src={fullRecipe.strMealThumb}
                  alt={fullRecipe.strMeal}
                  className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {fullRecipe.strCategory && (
                    <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      <span>{fullRecipe.strCategory}</span>
                    </div>
                  )}
                  {fullRecipe.strArea && (
                    <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{fullRecipe.strArea}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-beige-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Prep time: 30 minutes</span>
                </div>

                <div className="flex items-center text-beige-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Serves 4 people</span>
                </div>

                {/* External Links */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {fullRecipe.strYoutube && (
                    <a
                      href={fullRecipe.strYoutube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 text-sm font-medium"
                    >
                      <Youtube className="h-4 w-4 mr-2" />
                      Watch Video
                    </a>
                  )}
                  {fullRecipe.strSource && (
                    <a
                      href={fullRecipe.strSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 text-sm font-medium"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Original Recipe
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Ingredients
              </h3>
              <div className="bg-beige-50 rounded-xl p-6">
                <div className="grid sm:grid-cols-2 gap-3">
                  {getIngredients(fullRecipe).map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span className="text-gray-700">
                        <span className="font-medium">{item.measure}</span>{" "}
                        {item.ingredient}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Instructions
              </h3>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="space-y-4">
                  {formatInstructions(fullRecipe.strInstructions).map(
                    (step, index) => (
                      <div key={index} className="flex">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-600">Unable to load recipe details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
