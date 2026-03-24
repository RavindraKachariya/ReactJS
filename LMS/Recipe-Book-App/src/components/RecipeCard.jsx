import { Link } from 'react-router-dom';
import { FaClock, FaUsers, FaChevronRight } from 'react-icons/fa';

const RecipeCard = ({ recipe }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <Link
            to={`/recipe/${recipe.id}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={recipe.imageUrl || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400'}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {recipe.category}
                    </span>
                </div>

                {/* Dietary Badge */}
                {recipe.dietary && (
                    <div className="absolute top-3 right-3">
                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {recipe.dietary}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {recipe.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                        <FaClock className="text-orange-500" />
                        <span>{recipe.prepTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <FaUsers className="text-orange-500" />
                        <span>{recipe.servings} servings</span>
                    </div>
                </div>

                {/* Date */}
                <div className="text-xs text-gray-400">
                    Added {formatDate(recipe.dateAdded)}
                </div>

                {/* Arrow */}
                <div className="flex items-center text-orange-500 mt-3 text-sm font-medium group-hover:text-orange-600">
                    <span>View Recipe</span>
                    <FaChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
