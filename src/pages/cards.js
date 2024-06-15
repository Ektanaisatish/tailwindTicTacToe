import React from "react";
import { useCart } from "../context/CartContext";

const Card = () => {
  const cart = useCart();

  // Helper function to calculate the total price for a single item
  const calculateItemTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  // Function to calculate the total price for all items in the cart
  const calculateTotalPrice = () => {
    return cart.item.reduce((total, item) => {
      return total + calculateItemTotalPrice(item);
    }, 0);
  };

  return (
    <>
      <div className="grid grid-rows-4 gap-4" style={{ padding: '30px' }}>
        {cart && cart.item.map((item) => (
          <div key={item.id} className="max-w-sm p-6 bg-green border border-red-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 col-md-4">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
              Total: {calculateItemTotalPrice(item)}
            </h5>
            
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Price: {item.price}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Items: {item.quantity}
            </p>
          </div>
        ))}
        <div className="container ml-0">
        <h5 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
              Total Price: {calculateTotalPrice()}
            </h5></div>
      </div>
    </>
  );
};

export default Card;

// import React, { useContext } from 'react'
// import { CartContext } from '../context/CartContext'

// const Card = () => {
//   const cart=useContext(CartContext)
//   const total = cart.item.reduce((a,b)=>a+b.price,0)
//   return (
//     <div>
//   {cart &&
//     cart.item.map((item)=>(
//       <li>
//         {item.title}
//         {/* {item.price} */}
//         {total}
//       </li>
//     ))
//   }
//     </div>
//   )
// }
// export default Card
