const RecipeCard = ({ recipe, onView }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition">
            <img src={recipe.image} className="h-48 w-full object-cover" />

            <div className="p-4">
                <h3 className="text-xl font-semibold">{recipe.title}</h3>
                <p className="text-gray-500 mt-1">⏱ {recipe.time}</p>

                <button
                    onClick={() => onView(recipe)}
                    className="mt-3 bg-orange-500 text-white px-4 py-2 rounded-lg"
                >
                    View Recipe
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;
