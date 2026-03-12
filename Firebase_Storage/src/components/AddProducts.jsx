import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productSlice";

const AddProduct = () => {

    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = (e) => {
        console.log("HandleSubmit Called.......");

        e.preventDefault()

        const newProduct = {
            name: name,
            image: image,
            price: price
        }

        dispatch(addProduct(newProduct))

        setName(" ");
        setImage(" ");
        setPrice(" ");
    }

    return (
        <>
            <h2 className="text-center bg-purple-700 text-white p-6">Add Product Form</h2>
            <form className="max-w-sm mx-auto m-6" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Product Name
                    </label>
                    <input
                        type="text"
                        id="text"
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Your Product Name"
                        required=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="text"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Product Image
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Your Product Image"
                        required=""
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="number"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Your Product Price
                    </label>
                    <input
                        type="number"
                        id="number"
                        value={price}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="Your Product Price"
                        required=""
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className=" bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none bg-purple-600"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default AddProduct