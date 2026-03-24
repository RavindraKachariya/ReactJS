import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes, setFilter, setLoading, setError } from '../store/recipeSlice';
import { Link } from 'react-router-dom';
import { FaSearch, FaFilter, FaClock, FaUsers } from 'react-icons/fa';

const RecipeList = () => {
    const dispatch = useDispatch();
    const { recipes, loading, error, filter } = useSelector((state) => state.recipes);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Fetch recipes on mount
    useEffect(() => {
        dispatch(setLoading(true));
        fetch('http://localhost:3001/recipes')
            .then(res => res.json())
            .then(data => {
                dispatch(setRecipes(data));
            })
            .catch(err => {
                dispatch(setError('Failed to load recipes. Make sure JSON Server is running.'));
            });
    }, [dispatch]);

    // Get unique options
    const categories = useMemo(() => {
        return [...new Set(recipes.map((r) => r.category).filter(Boolean))].sort();
    }, [recipes]);

    const dietaryOptions = useMemo(() => {
        return [...new Set(recipes.map((r) => r.dietary).filter(Boolean))].sort();
    }, [recipes]);

    // Filter and sort
    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(r =>
                r.title.toLowerCase().includes(term) ||
                r.description?.toLowerCase().includes(term)
            );
        }

        if (filter.category) {
            result = result.filter(r => r.category === filter.category);
        }

        if (filter.dietary) {
            result = result.filter(r => r.dietary === filter.dietary);
        }

        result.sort((a, b) => {
            if (filter.sortBy === 'name') {
                return filter.sortOrder === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            const dateA = new Date(a.dateAdded || 0);
            const dateB = new Date(b.dateAdded || 0);
            return filter.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return result;
    }, [recipes, searchTerm, filter]);

    const handleFilterChange = (key, value) => {
        dispatch(setFilter({ [key]: value }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <div className="bg-gradient-to-r from-orange-600 to-red-600 py-8">
                <h1 className="text-3xl text-white text-center font-bold">Recipe Book</h1>
                <p className="text-white/80 text-center mt-2">Discover delicious recipes</p>
            </div>

            <div className="max-w-6xl mx-auto p-4">
                {/* Search */}
                <div className="flex gap-2 mb-4">
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search recipes..."
                            className="w-full p-3 border rounded-lg"
                        />
                    </div>
                    <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-3 bg-gray-200 rounded-lg">
                        <FaFilter />
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-white p-4 rounded-lg mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <select value={filter.category} onChange={(e) => handleFilterChange('category', e.target.value)} className="p-2 border rounded">
                            <option value="">All Categories</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <select value={filter.dietary} onChange={(e) => handleFilterChange('dietary', e.target.value)} className="p-2 border rounded">
                            <option value="">All Dietary</option>
                            {dietaryOptions.map(diet => <option key={diet} value={diet}>{diet}</option>)}
                        </select>
                        <select value={filter.sortBy} onChange={(e) => handleFilterChange('sortBy', e.target.value)} className="p-2 border rounded">
                            <option value="dateAdded">Sort by Date</option>
                            <option value="name">Sort by Name</option>
                        </select>
                        <select value={filter.sortOrder} onChange={(e) => handleFilterChange('sortOrder', e.target.value)} className="p-2 border rounded">
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </select>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="text-center py-8">
                        <div className="inline-block w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-2 text-gray-600">Loading recipes...</p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                        <p className="text-sm">Run: npm run server</p>
                    </div>
                )}

                {/* Recipe Grid */}
                {!loading && filteredRecipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredRecipes.map((recipe) => (
                            <Link key={recipe.id} to={`/recipe/${recipe.id}`} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                                <img src={recipe.imageUrl || 'https://via.placeholder.com/400x200'} alt={recipe.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <div className="flex gap-2 mb-2">
                                        {recipe.category && <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">{recipe.category}</span>}
                                        {recipe.dietary && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{recipe.dietary}</span>}
                                    </div>
                                    <h3 className="font-bold text-lg mb-1">{recipe.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{recipe.description}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1"><FaClock /> {recipe.prepTime || '-'}</span>
                                        <span className="flex items-center gap-1"><FaUsers /> {recipe.servings || '-'}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">{formatDate(recipe.dateAdded)}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {!loading && filteredRecipes.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">No recipes found</p>
                        {searchTerm && <button onClick={() => setSearchTerm('')} className="text-orange-600 mt-2">Clear search</button>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;
