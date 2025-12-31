export const getRecipes = async () => {
    try {
        const res = await fetch("https://dummyjson.com/recipes?limit=10");
        const data = await res.json();

        // Convert API data into YOUR app format
        return data.recipes.map((item) => ({
            id: item.id,
            title: item.name,
            image: item.image,
            time: `${item.prepTimeMinutes + item.cookTimeMinutes} min`,
            instructions: item.instructions.join(" → "),
        }));
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
};
