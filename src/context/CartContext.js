import React, { createContext, useContext, useState } from 'react'
export const CartContext =createContext(null)
export const useCart=()=>{
  const card =useContext(CartContext)
  return card;
}
export const  CartProvider = (props) => {
const [item,setItem] =useState([]);
  return (
   <CartContext.Provider value={{item,setItem}}>
        {
            props.children
        }
   </CartContext.Provider>
  )
}


// import React, { createContext, useState } from 'react'
// export const CartContext =createContext(null)
// export const  CartProvider = (props) => {
// const [item,setItem] =useState([]);
//   return (
//    <CartContext.Provider value={{item,setItem}}>
//         {
//             props.children
//         }
//    </CartContext.Provider>
//   )
// }
