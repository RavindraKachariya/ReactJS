const Services = () => {
    return (
        <div className="px-10 py-16">

            <h1 className="text-4xl font-bold mb-10 text-center">Our Services</h1>

            <div className="grid md:grid-cols-3 gap-8">

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">Web Development</h2>
                    <p>Modern React websites & dashboards.</p>
                </div>

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">UI/UX Design</h2>
                    <p>Clean and responsive designs.</p>
                </div>

                <div className="shadow-lg p-6 rounded">
                    <h2 className="text-xl font-bold mb-2">E-commerce</h2>
                    <p>Complete online store solutions.</p>
                </div>

            </div>

        </div>
    )
}

export default Services