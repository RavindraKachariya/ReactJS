const ApiCard = ({ api }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-bold">{api.API}</h2>
            <p className="text-gray-600 mt-2">{api.Description}</p>

            <div className="mt-2 text-sm text-blue-500">
                Category: {api.Category}
            </div>

            <a
                href={api.Link}
                target="_blank"
                className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded"
            >
                Visit API
            </a>
        </div>
    );
};

export default ApiCard;