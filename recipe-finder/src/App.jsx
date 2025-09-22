import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { RecipeList } from "./components/RecipeList";
import { FavoritesList } from "./components/FavoritesList";
import { RecipeModal } from "./components/RecipeModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Star, Utensils } from "lucide-react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useLocalStorage("recipe-favorites", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRecipes = async (ingredient) => {
    setLoading(true);
    setError("");
    setSearchQuery(ingredient);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          ingredient
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
        setActiveTab("search");
      } else {
        setRecipes([]);
        setError(
          `No recipes found with "${ingredient}". Try a different ingredient!`
        );
      }
    } catch (err) {
      setError(
        "Unable to fetch recipes. Please check your connection and try again."
      );
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.idMeal !== recipe.idMeal));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-50 via-white to-orange-50 font-poppins">
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
            <span className="text-4xl sm:text-6xl mr-0 sm:mr-4 mb-2 sm:mb-0">
              🍳
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-orange-500 via-green-500 to-orange-600 bg-clip-text text-transparent">
              Recipe Finder
            </h1>
          </div>
          <p className="text-base sm:text-xl text-beige-600 max-w-full sm:max-w-3xl mx-auto leading-relaxed font-medium px-2">
            Discover amazing recipes by searching for your favorite ingredients
            and create your personal cookbook
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-10 sm:mb-16">
          <SearchBar onSearch={fetchRecipes} loading={loading} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-beige-200 p-1 sm:p-2 flex flex-col sm:flex-row w-full max-w-md mx-auto">
            <button
              onClick={() => setActiveTab("search")}
              className={`w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2 px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === "search"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105"
                  : "text-beige-600 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <Utensils className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base">Search Results</span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                activeTab === "favorites"
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg transform scale-105"
                  : "text-beige-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Star className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base">Favorites</span>
              {favorites.length > 0 && (
                <span className="ml-2 bg-white text-orange-600 text-xs font-bold rounded-full px-2 py-1 shadow-sm">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-full sm:max-w-7xl mx-auto">
          {activeTab === "search" ? (
            <RecipeList
              recipes={recipes}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewRecipe={handleViewRecipe}
              loading={loading}
              error={error}
            />
          ) : (
            <FavoritesList
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onViewRecipe={handleViewRecipe}
            />
          )}
        </main>

        {/* Recipe Modal */}
        <RecipeModal
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={closeModal}
          isFavorite={
            selectedRecipe
              ? favorites.some((fav) => fav.idMeal === selectedRecipe.idMeal)
              : false
          }
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </div>
  );
}

export default App;
