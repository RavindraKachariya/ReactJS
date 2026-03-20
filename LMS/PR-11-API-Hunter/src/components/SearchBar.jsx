const SearchBar = ({ search, setSearch }) => {
    return (
        <div className="p-4 flex justify-center">
            <input
                type="text"
                placeholder="Search API..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-md p-2 border rounded-lg"
            />
        </div>
    );
};

export default SearchBar;