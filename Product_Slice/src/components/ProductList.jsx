import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";

const ProductList = () => {
  const productData = useSelector((state) => state.products);

  return (
    <>
      <div className="container mx-auto mt-4">
        <AddProduct />
      </div>
      <div className="container mx-auto flex flex-wrap justify-between">
        {productData.map((p) => {
          return <ProductCard key={p.id} data={p} mode="product" />;
        })}
      </div>
    </>
  );
};

export default ProductList;