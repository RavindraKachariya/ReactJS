import { useEffect, useState } from "react";
import { getRecipes } from "./api/recipesApi";
import RecipeCard from "./components/RecipeCard";
import RecipeDetails from "./components/RecipeDetails";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getRecipes().then(setRecipes);
  }, []);

  // Search Filter Logic
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-4">
        🍽️ Simple Recipe App
      </h1>

      {/* 🔍 Search Input */}
      {!selectedRecipe && (
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search recipe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
      )}

      {/* Home or Details */}
      {!selectedRecipe ? (
        filteredRecipes.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onView={setSelectedRecipe}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No recipe found
          </p>
        )
      ) : (
        <RecipeDetails
          recipe={selectedRecipe}
          onBack={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default App;
