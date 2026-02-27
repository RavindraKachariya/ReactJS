import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { clearCart } from "../redux/productSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  console.log("cartData", cartData);

  return (
    <>
      <div>
        <button
          type="button"
          className="inline-flex items-center bg-brand hover:bg-brand-strong box-border border focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none  border-black"
          onClick={() => dispatch(clearCart())}
        >
          <svg
            className="w-4 h-4 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
            />
          </svg>
          ClearCart
        </button>
        {cartData.map((p) => {
          return <ProductCard key={p.id} data={p} mode="cart" />;
        })}
      </div>
    </>
  );
};

export default Cart;