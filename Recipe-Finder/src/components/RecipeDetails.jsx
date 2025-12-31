const RecipeDetails = ({ recipe, onBack }) => {
    return (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
            <img
                src={recipe.image}
                className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-2xl font-bold mt-4">{recipe.title}</h2>
            <p className="text-gray-500">⏱ {recipe.time}</p>

            <h3 className="text-lg font-semibold mt-4">Instructions</h3>
            <p className="text-gray-700 mt-2">{recipe.instructions}</p>

            <button
                onClick={onBack}
                className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg"
            >
                ⬅ Back
            </button>
        </div>
    );
};

export default RecipeDetails;
