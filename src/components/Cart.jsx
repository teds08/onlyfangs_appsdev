import React from 'react'

function Cart({ items = [], onRemove = () => {} }) {
  if (!items || items.length === 0) {
    return <p className="text-center text-gray-600">Your cart is empty.Add To Cart na Bossing!</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((p, i) => (
        <div key={i} className="flex items-center gap-3 border rounded p-3">
          {p.images && p.images[0] && (
            <img src={p.images[0]} alt={p.title} className="w-16 h-16 object-cover rounded" />
          )}
          <div className="flex-1">
            <div className="font-semibold">{p.title}</div>
            <div className="text-sm text-gray-600">${p.price}</div>
          </div>
          <div>
            <button onClick={() => onRemove(i)} className="px-3 py-1 border rounded">Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart
