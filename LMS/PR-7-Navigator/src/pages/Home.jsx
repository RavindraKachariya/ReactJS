const Home = () => {
    return (
        <div>

            {/* Hero Section */}
            <section className="bg-gray-100 py-20 text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to Navigator</h1>
                <p className="text-gray-600 mb-6">
                    Build modern React applications with routing & navigation.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded">
                    Get Started
                </button>
            </section>

            {/* Features Section */}
            <section className="py-16 px-10 grid md:grid-cols-3 gap-8">
                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">Fast</h2>
                    <p>Optimized performance with SPA architecture.</p>
                </div>

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">Modern</h2>
                    <p>Built using latest React and Tailwind.</p>
                </div>

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">Scalable</h2>
                    <p>Perfect structure for large applications.</p>
                </div>
            </section>

        </div>
    )
}

export default Home