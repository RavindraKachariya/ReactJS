import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, deleteRecipe } from '../store/recipeSlice';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { recipes } = useSelector((state) => state.recipes);
    const { user } = useSelector((state) => state.auth);

    const [recipe, setRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        const found = recipes.find(r => r.id === id);
        if (found) {
            setRecipe(found);
            setEditData(found);
        }
    }, [id, recipes]);

    const handleChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...editData.ingredients];
        newIngredients[index] = value;
        setEditData({ ...editData, ingredients: newIngredients });
    };

    const handleUpdate = async () => {
        const updated = { ...editData };
        await fetch(`http://localhost:3001/recipes/${recipe.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        });
        dispatch(updateRecipe(updated));
        setIsEditing(false);
    };

    const handleDelete = async () => {
        if (window.confirm('Delete this recipe?')) {
            await fetch(`http://localhost:3001/recipes/${recipe.id}`, { method: 'DELETE' });
            dispatch(deleteRecipe(recipe.id));
            navigate('/');
        }
    };

    if (!recipe) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Recipe not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="text-orange-600 hover:underline mb-4 inline-block">← Back to Recipes</Link>

                <img src={recipe.imageUrl || 'https://via.placeholder.com/800x400'} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />

                {isEditing ? (
                    <input type="text" name="title" value={editData.title} onChange={handleChange} className="text-2xl font-bold w-full mb-2 p-2 border rounded" />
                ) : (
                    <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
                )}

                <div className="flex gap-2 mb-4">
                    {recipe.category && <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">{recipe.category}</span>}
                    {recipe.dietary && <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{recipe.dietary}</span>}
                </div>

                {isEditing ? (
                    <textarea name="description" value={editData.description} onChange={handleChange} className="w-full mb-4 p-2 border rounded" rows={2} />
                ) : (
                    <p className="text-gray-600 mb-4">{recipe.description}</p>
                )}

                <div className="bg-white p-4 rounded-lg mb-4 grid grid-cols-3 gap-4 text-center">
                    <div><p className="text-gray-500 text-sm">Prep</p><p className="font-semibold">{recipe.prepTime || '-'}</p></div>
                    <div><p className="text-gray-500 text-sm">Cook</p><p className="font-semibold">{recipe.cookTime || '-'}</p></div>
                    <div><p className="text-gray-500 text-sm">Servings</p><p className="font-semibold">{recipe.servings || '-'}</p></div>
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-3">Ingredients</h2>
                    {isEditing ? (
                        <div>
                            {editData.ingredients?.map((ing, i) => (
                                <input key={i} value={ing} onChange={(e) => handleIngredientChange(i, e.target.value)} className="w-full p-2 border rounded mb-2" />
                            ))}
                        </div>
                    ) : (
                        <ul className="list-disc list-inside">
                            {recipe.ingredients?.map((ing, i) => <li key={i} className="text-gray-700">{ing}</li>)}
                        </ul>
                    )}
                </div>

                <div className="bg-white p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-3">Instructions</h2>
                    {isEditing ? (
                        <textarea name="instructions" value={editData.instructions} onChange={handleChange} className="w-full p-2 border rounded" rows={6} />
                    ) : (
                        <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>
                    )}
                </div>

                {user && (
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</button>
                                <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Edit</button>
                                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeDetails;
