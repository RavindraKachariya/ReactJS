import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Cart = () => {

  const cartData = useSelector((state) => state.cart);

  return (
    <div className="flex flex-wrap gap-6 p-10">
      {
        cartData.length === 0 ? (
          <h1 className="text-2xl font-bold">Cart is Empty</h1>
        ) : (
          cartData.map((p) => (
            <ProductCard
              key={p.id}
              productdata={p}
            />
          ))
        )
      }
    </div>
  );
};

export default Cart;