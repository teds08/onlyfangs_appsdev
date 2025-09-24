import React from 'react'
import { FaCartPlus } from "react-icons/fa6";


function Card({ product, onBuy }) {
    const { title, price, description, images = [] } = product || {};

    const handleBuy = () => {
      if (typeof onBuy === 'function') onBuy(product);
    };

    const imgSrc = Array.isArray(images) ? images[0] : images;

    return (
     <div className="max-w-sm rounded-2xl shadow-lg bg-white p-4 m-3 transform transition-transform duration-200 hover:scale-105 hover:shadow-2xl group">
      {imgSrc && <img src={imgSrc} alt={title} className="w-full h-48 object-cover rounded-xl mb-3 transition-all duration-200 group-hover:scale-105" />}
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <p className="text-green-700 font-semibold mt-2">${price}</p>
      <div className="mt-4">
         <button
        onClick={handleBuy}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
    
        <FaCartPlus className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
      </div>
    </div>
  )
}

export default Card
