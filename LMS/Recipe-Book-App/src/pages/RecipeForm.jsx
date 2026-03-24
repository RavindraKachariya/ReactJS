import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addRecipe } from '../store/recipeSlice';

const RecipeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [''],
        instructions: '',
        category: '',
        dietary: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        imageUrl: '',
    });

    const categories = ['Italian', 'Mexican', 'Asian', 'Salad', 'Dessert', 'American', 'Indian'];
    const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients];
        newIngredients[index] = value;
        setFormData({ ...formData, ingredients: newIngredients });
    };

    const addIngredient = () => {
        setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('Please enter a recipe title');
            return;
        }

        const validIngredients = formData.ingredients.filter(i => i.trim() !== '');
        if (validIngredients.length === 0) {
            alert('Please add at least one ingredient');
            return;
        }

        setLoading(true);

        const recipeData = {
            ...formData,
            ingredients: validIngredients,
            dateAdded: new Date().toISOString(),
        };

        try {
            const res = await fetch('http://localhost:3001/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(recipeData)
            });
            const savedRecipe = await res.json();
            dispatch(addRecipe(savedRecipe));
            navigate('/');
        } catch (error) {
            alert('Failed to save recipe');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-2xl mx-auto">
                <Link to="/" className="text-orange-600 hover:underline mb-4 inline-block">← Back to Recipes</Link>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-medium mb-1">Title *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full p-2 border rounded" required />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Category</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                                    <option value="">Select</option>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Dietary</label>
                                <select name="dietary" value={formData.dietary} onChange={handleChange} className="w-full p-2 border rounded">
                                    <option value="">Select</option>
                                    {dietaryOptions.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block font-medium mb-1">Prep Time</label>
                                <input type="text" name="prepTime" value={formData.prepTime} onChange={handleChange} className="w-full p-2 border rounded" placeholder="15 min" />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Cook Time</label>
                                <input type="text" name="cookTime" value={formData.cookTime} onChange={handleChange} className="w-full p-2 border rounded" placeholder="30 min" />
                            </div>
                            <div>
                                <label className="block font-medium mb-1">Servings</label>
                                <input type="number" name="servings" value={formData.servings} onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Ingredients *</label>
                            {formData.ingredients.map((ing, i) => (
                                <input key={i} type="text" value={ing} onChange={(e) => handleIngredientChange(i, e.target.value)} className="w-full p-2 border rounded mb-2" placeholder={`Ingredient ${i + 1}`} />
                            ))}
                            <button type="button" onClick={addIngredient} className="text-orange-600 text-sm">+ Add Ingredient</button>
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Instructions</label>
                            <textarea name="instructions" value={formData.instructions} onChange={handleChange} className="w-full p-2 border rounded" rows={4} />
                        </div>

                        <div>
                            <label className="block font-medium mb-1">Image URL</label>
                            <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full p-2 border rounded" placeholder="https://..." />
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Recipe'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecipeForm;
