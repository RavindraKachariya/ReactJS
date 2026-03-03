import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import AddProduct from "./AddProduct";
import { fetchProducts } from "../redux/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto mt-4">
        <AddProduct />
      </div>

      <div className="container mx-auto mt-6 flex flex-wrap gap-6 justify-start">

        {loading && (
          <h2 className="text-xl font-semibold text-gray-600">
            Loading products...
          </h2>
        )}

        {error && (
          <h2 className="text-xl font-semibold text-red-500">
            Error: {error}
          </h2>
        )}

        {!loading && !error && products.length === 0 && (
          <h2 className="text-xl font-semibold text-gray-500">
            No Products Available
          </h2>
        )}

        {!loading &&
          !error &&
          products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              data={product}
              mode="product"
            />
          ))}
      </div>
    </>
  );
};

export default ProductList;