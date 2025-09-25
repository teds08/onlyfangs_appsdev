import React from 'react'

function Cart({ items = [], onRemove = () => {} }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-600">Your cart is empty.Add To Cart na Bossing!</p>;
  }

  return (

<div className="flex justify-center">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((p, i) => (
        <div
          key={i}
          className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col items-center hover:shadow-md transition"
        >
          {p.images && p.images[0] && (
            <img
              src={p.images[0]}
              alt={p.title}
              className="w-28 h-28 object-cover rounded-lg mb-3"
            />
          )}
          <div className="text-center flex-1">
            <div className="font-medium text-gray-800">{p.title}</div>
            <div className="text-gray-500 mt-1">${p.price}</div>
          </div>
          <button
            onClick={() => onRemove(i)}
            className="mt-3 px-4 py-2 w-full rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition cursor-pointer"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  </div>
</div>


  )
}

export default Cart
