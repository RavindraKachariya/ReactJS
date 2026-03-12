import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, deleteProduct } from "../features/products/productSlice";

const ProductList = () => {

    const products = useSelector((state) => state.products)

    const dispatch = useDispatch()

    // console.log('products' , products);


    useEffect(() => {
        dispatch(fetchProduct())
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