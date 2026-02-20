const Contact = () => {
    return (
        <div className="px-10 py-16 max-w-xl mx-auto">

            <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

            <form className="space-y-4">

                <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border p-3 rounded"
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border p-3 rounded"
                />

                <textarea
                    placeholder="Your Message"
                    className="w-full border p-3 rounded"
                />

                <button className="bg-blue-600 text-white px-6 py-3 rounded w-full">
                    Send Message
                </button>

            </form>

        </div>
    )
}

export default Contact