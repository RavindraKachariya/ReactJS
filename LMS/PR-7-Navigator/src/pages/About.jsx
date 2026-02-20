const About = () => {
    return (
        <div className="px-10 py-16">

            <h1 className="text-4xl font-bold mb-6">About Us</h1>

            <p className="mb-6 text-gray-600">
                Navigator is a learning project designed to understand routing,
                navigation and real-world React structure.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
                    <p>To teach modern React development in a practical way.</p>
                </div>

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                    <p>Build scalable real-world applications.</p>
                </div>
            </div>

        </div>
    )
}

export default About