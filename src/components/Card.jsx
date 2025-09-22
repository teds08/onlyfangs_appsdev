import React from 'react'
import { HiShoppingCart } from "react-icons/hi";


function Card({ title, price, description, images }) {
    const handleBuy = () => {
    console.log("Product clicked:", {
      title,
      price,
      description,
      images,
    });
  };
  return (
     <div className="max-w-sm rounded-2xl shadow-lg bg-white p-4 m-3">
      <img
        src={images}
        alt={title}
        className="w-full h-48 object-cover rounded-xl mb-3"/>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <p className="text-green-700 font-semibold mt-2">${price}</p>
      <div className="mt-4">
         <button
        onClick={handleBuy}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        <HiShoppingCart className="w-5 h-5" />
        <span>Buy</span>
      </button>
      </div>
    </div>
  )
}

export default Card
