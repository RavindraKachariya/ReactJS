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

      <div className="container mx-auto mt-6">

        {loading && (
          <div className="text-center text-lg font-semibold text-blue-500">
            Loading products...
          </div>
        )}

        {error && (
          <div className="text-center text-lg font-semibold text-red-500">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-wrap justify-between">
            {products?.length > 0 ? (
              products.map((p) => (
                <ProductCard key={p.id} data={p} mode="product" />
              ))
            ) : (
              <div className="text-center w-full text-gray-500">
                No products available.
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
};

export default ProductList;