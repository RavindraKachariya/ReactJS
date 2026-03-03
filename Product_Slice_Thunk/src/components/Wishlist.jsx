import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";

const Wishlist = () => {
    const wishlistData = useSelector((state) => state.wishlist.wishlist);
    const dispatch = useDispatch();

    const handleMoveToCart = (product) => {
        dispatch(addToCart(product));
        dispatch(removeFromWishlist(product.id));
    };

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    My Wishlist ({wishlistData.length})
                </h1>

                {wishlistData.length > 0 && (
                    <button
                        onClick={() => dispatch(clearWishlist())}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow"
                    >
                        Clear Wishlist
                    </button>
                )}
            </div>

            {/* Empty State */}
            {wishlistData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="bg-gray-100 p-6 rounded-full mb-6">
                        <svg
                            className="w-16 h-16 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-700">
                        Your wishlist is empty
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Add items to your wishlist to see them here.
                    </p>
                </div>
            ) : (
                /* Product Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistData.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border"
                        >
                            {/* Image */}
                            <div className="p-4 flex justify-center bg-gray-50">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="h-40 object-contain"
                                />
                            </div>

                            {/* Details */}
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">
                                    {p.name}
                                </h3>

                                <p className="text-xl font-bold text-indigo-600 mt-2">
                                    ${p.price}
                                </p>

                                {/* Actions */}
                                <div className="flex gap-3 mt-5">
                                    <button
                                        onClick={() => handleMoveToCart(p)}
                                        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                                    >
                                        Move to Cart
                                    </button>

                                    <button
                                        onClick={() => dispatch(removeFromWishlist(p.id))}
                                        className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;