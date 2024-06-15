import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import  Card  from "./cards";
const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { item: cartItems, setItem: setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://fakestoreapi.com/products";
        const response = await axios.get(url);
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // Calculate the indices for the current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const Items = items.slice(indexOfFirstItem, indexOfLastItem);

  // Change page handler
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Add to cart function
  const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity++;
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div style={{ padding: "auto" }}>
      <Card />
      {Items.map((item) => (
        <div key={item.id}>
          <div className="max-w-sm p-9 bg-blue-50 border border-gray-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
              {item.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">quantity{item.quantity}</p>

            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-400 dark:hover:bg-green-800 dark:focus:ring-blue-600"
              onClick={() => addToCart(item)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ))}

      {/* Pagination controls */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`page-number ${currentPage === number ? "active" : ""} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;


// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import {CartContext} from '../context/CartContext'
// const Dashboard = () => {
//   const [Items, setItems] = useState([]);
//   const Cart =useContext(CartContext);
//   console.log("Cart",Cart);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const url = "https://freetestapi.com/api/v1/books";
//         const response = await axios.get(url);
//         setItems(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   return(
//     <div>
//       {Items.map((item) => (
//         <div key={item.id}>
//           <h1>{item.title}</h1>
//           <h2>{item.price}</h2>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={()=>Cart.setItem([...Cart.item,{title: item.title,price:item.price}])}>Add to cart</button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Dashboard;
