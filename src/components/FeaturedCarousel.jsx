import { useEffect, useRef, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function FeaturedCarousel({ items = [], onBuy }) {
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);

  useEffect(() => {
    if (!items || items.length === 0) return;
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 3500);
    return () => clearInterval(autoplayRef.current);
  }, [items]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  if (!items || items.length === 0) return null;

  const current = items[index];

  return (
    <div className="w-full rounded-lg overflow-hidden relative bg-white shadow-md">
      <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
        <img src={current?.thumbnail || current?.images?.[0]} alt={current?.title} className="w-full h-full object-contain" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-4 bottom-4 text-white">
          <h3 className="text-lg md:text-2xl font-bold">{current.title}</h3>
          <p className="text-sm md:text-base">{current.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="text-xl font-semibold">${current.price}</div>
            <button onClick={() => onBuy && onBuy(current)} className="px-3 py-1 bg-yellow-400 text-black rounded cursor-pointer">Add to Cart</button>
          </div>
        </div>
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white">
          <HiChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white">
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="p-3 flex items-center justify-center gap-2">
        {items.map((it, i) => (
          <button key={it.id} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-yellow-400' : 'bg-gray-300'}`} aria-label={`Go to ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
