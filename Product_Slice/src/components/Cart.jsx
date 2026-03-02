import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeToCart, increseQuentity, decreseQuentity } from "../redux/productSlice";

const Cart = () => {
  const cartData = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const totalAmount = useSelector(state => state.totalAmount)

  console.log("cartData", cartData);
  console.log("cartData", totalAmount);

  // const handleIncrement = (id) => {
  //   let amount = cartData.find((p) => p.id === id)
  //   let quntity = amount.quentity += 1
  //   console.log(amount.price  * quntity);
  // }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-end my-4">
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
        </div>
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="">Image</span>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartData.map((p) => {
                return (
                  <tr className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                    <td className="p-4">
                      <img
                        src={p.image}
                        className="w-16 md:w-24 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading">
                      {p.name}
                    </td>
                    <td className="px-6 py-4">
                      <form className="max-w-xs mx-auto">
                        <label htmlFor="counter-input-1" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="relative flex items-center">
                          <button
                            type="button"
                            id="decrement-button-1"
                            data-input-counter-decrement="counter-input-1"
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                            onClick={() => dispatch(decreseQuentity(p.id))}
                          >
                            <svg
                              className="w-3 h-3 text-heading"
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
                                d="M5 12h14"
                              />
                            </svg>
                          </button>
                          {
                            p.quentity
                          }
                          {/* <input
                            type="text"
                            id="counter-input-1"
                            data-input-counter=""
                            className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                            placeholder=""
                            defaultValue={1}
                            required=""
                          /> */}
                          <button
                            type="button"
                            id="increment-button-1"
                            data-input-counter-increment="counter-input-1"
                            className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                            onClick={() => dispatch(increseQuentity(p.id))}
                          >
                            <svg
                              className="w-3 h-3 text-heading"
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
                                d="M5 12h14m-7 7V5"
                              />
                            </svg>
                          </button>
                        </div>
                      </form>
                    </td>
                    <td className="px-6 py-4 font-semibold text-heading">
                      ${p.price * p.quentity}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="font-medium text-fg-danger hover:underline"
                        onClick={() => dispatch(removeToCart(p.id))}
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            TotalAmount : {totalAmount}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;