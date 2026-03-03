import { useSelector, useDispatch } from "react-redux";
import {
  clearCart,
  increseQuentity,
  decreseQuentity,
  removeToCart,
} from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.cart.cart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Shopping Cart ({cartData.length})
        </h1>

        {cartData.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-24">
          <h2 className="text-2xl font-semibold text-gray-600">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mt-2">
            Add products to your cart to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartData.map((p) => (
              <div
                key={p.id}
                className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center"
              >
                {/* Image */}
                <div className="w-32 h-32 flex items-center justify-center bg-gray-50 rounded-lg">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-24 object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>

                  <p className="text-indigo-600 font-bold mt-2">
                    ${p.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => dispatch(decreseQuentity(p.id))}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="font-medium text-lg">
                      {p.quentity}
                    </span>

                    <button
                      onClick={() => dispatch(increseQuentity(p.id))}
                      className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-6 mt-4 text-sm">
                    <button
                      onClick={() => dispatch(removeToCart(p.id))}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>

                    <button
                      onClick={() => {
                        dispatch(addToWishlist(p));
                        dispatch(removeToCart(p.id));
                      }}
                      className="text-indigo-600 hover:underline"
                    >
                      Move to Wishlist
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-lg font-bold text-gray-800">
                  ${p.price * p.quentity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-xl p-6 h-fit sticky top-10">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${totalAmount}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${totalAmount}</span>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-6 hover:bg-indigo-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;