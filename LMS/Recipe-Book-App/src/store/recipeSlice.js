import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
        filter: { category: '', dietary: '', sortBy: 'dateAdded', sortOrder: 'desc' },
    },
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
            state.loading = false;
        },
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        updateRecipe: (state, action) => {
            const index = state.recipes.findIndex(r => r.id === action.payload.id);
            if (index !== -1) state.recipes[index] = action.payload;
        },
        deleteRecipe: (state, action) => {
            state.recipes = state.recipes.filter(r => r.id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setFilter: (state, action) => {
            state.filter = { ...state.filter, ...action.payload };
        },
    },
});

export const { setRecipes, addRecipe, updateRecipe, deleteRecipe, setLoading, setError, setFilter } = recipeSlice.actions;
export default recipeSlice.reducer;
