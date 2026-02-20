import { Link } from "react-router-dom"

const Products = () => {

    const products = [
        { id: 1, name: "Laptop", price: "₹50,000" },
        { id: 2, name: "Mobile", price: "₹20,000" },
        { id: 3, name: "Headphones", price: "₹3,000" }
    ]

    return (
        <div className="px-10 py-16">

            <h1 className="text-4xl font-bold mb-10 text-center">Our Products</h1>

            <div className="grid md:grid-cols-3 gap-8">

                {products.map(product => (
                    <div key={product.id} className="shadow-lg p-6 rounded">
                        <h2 className="text-xl font-bold">{product.name}</h2>
                        <p className="text-gray-600 mb-4">{product.price}</p>
                        <Link
                            to={`/products/${product.id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            View Details
                        </Link>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default Products