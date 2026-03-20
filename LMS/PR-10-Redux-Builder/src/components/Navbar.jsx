const Navbar = () => {
    return (
        <div className="bg-white shadow-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-blue-600">
                    Task Builder
                </h1>

                <p className="text-gray-500 text-sm">
                    Redux Toolkit App
                </p>
            </div>
        </div>
    );
};

export default Navbar;