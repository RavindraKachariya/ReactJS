import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, deleteProduct } from "../features/products/productSlice";

const ProductList = () => {

  const products = useSelector((state) => state.products)

  const dispatch = useDispatch()

  // console.log('products' , products);


  useEffect(() => {
    // Using Promise.all to properly handle async dispatch
    const fetchData = async () => {
      try {
        const result = await Promise.all([
          dispatch(fetchProduct())
        ])
        // Unwrap promise to check for errors
        await Promise.all(result.map(r => r.unwrap()));
        console.log("Products fetched successfully!");
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    fetchData()
  }, [dispatch])


  return (
    <>
      <h2 className="text-center bg-purple-700 text-white p-6">Product List</h2>
      {/* {
          products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt="" />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <button>Update</button>
              <button>Delete</button>
            </div>
          ))
        } */}
    </>
  )
}

export default ProductList