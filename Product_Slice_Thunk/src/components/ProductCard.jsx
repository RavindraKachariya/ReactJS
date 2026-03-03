import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ data, mode = "product" }) => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlist || []
  );

  const isInWishlist = wishlistItems.some(
    (item) => item.id === data.id
  );

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(data.id));
    } else {
      dispatch(addToWishlist(data));
    }
  };

  return (
    <div className="group w-75 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">

      {/* Image Section */}
      <div className="relative bg-gray-50 p-6">
        <img
          src={data.image}
          alt={data.name}
          className="h-52 w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:scale-110 transition"
        >
          <FaHeart
            className={`w-5 h-5 transition ${isInWishlist ? "text-red-500" : "text-gray-400"
              }`}
          />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <h5 className="text-lg font-semibold text-gray-800 truncate">
          {data.name}
        </h5>

        {/* Rating */}
        <div className="flex items-center mt-2 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.3 2.03 10.7 2.03 10.951 2.927L12.243 7.2l4.49.347c.92.071 1.29 1.24.588 1.81l-3.43 2.87 1.05 4.36c.22.92-.76 1.67-1.54 1.18L10 15.6l-3.4 2.17c-.78.49-1.76-.26-1.54-1.18l1.05-4.36-3.43-2.87c-.7-.57-.33-1.74.59-1.81l4.49-.35 1.29-4.27z" />
            </svg>
          ))}
          <span className="text-xs text-gray-500 ml-2">(5.0)</span>
        </div>

        {/* Price + Action */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-2xl font-bold text-indigo-600">
            ${data.price}
          </span>

          {mode === "product" ? (
            <button
              onClick={() => dispatch(addToCart(data))}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => dispatch(removeToCart(data.id))}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;