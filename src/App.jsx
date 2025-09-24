import { useEffect, useState, useCallback } from "react";
import { HiShoppingCart } from "react-icons/hi";
import Card from "./components/Card";
import FeaturedCarousel from "./components/FeaturedCarousel";
import Cart from './components/Addcart';
import { IoLogoFacebook } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { LuCircleHelp } from "react-icons/lu";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("All");
  const [debouncedSearch, setDebouncedSearch] = useState(search);


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        console.log(data);
        setProducts(data.products);
        setFiltered(data.products);
      } catch (err) {
        console.error("Bang error!", err);
      }
    }
    fetchProducts();
  }, []);

  
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 900);
    return () => clearTimeout(t);
  }, [search]);

  const filterAndSort = useCallback(() => {
    let result = [...products];

    if (debouncedSearch.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, debouncedSearch, category, priceRange, sort]);

  useEffect(() => {
    const res = filterAndSort();
    setFiltered(res);
    setCurrentPage(1); 
  }, [filterAndSort]);

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const goToPage = (n) => setCurrentPage(n < 1 ? 1 : n);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  
  const handleBuy = (product) => {
    setCartItems((prev) => [...prev, product]);
    console.log('Added to in-memory cart:', product.title);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  
  const loadSwal = () => {
    if (typeof window !== 'undefined' && window.Swal) return Promise.resolve(window.Swal);
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
      s.async = true;
      s.onload = () => resolve(window.Swal);
      s.onerror = () => reject(new Error('Failed to load SweetAlert2'));
      document.head.appendChild(s);
    });
  };

  const handleBuyAll = async () => {
    if (!cartItems || cartItems.length === 0) {
      try {
        const Swal = await loadSwal();
        Swal.fire({ icon: 'info', title: 'Your cart is empty. Add To Cart na Bossing!' });
      } catch {
        alert('Your cart is empty.');
      }
      return;
    }

    try {
      const Swal = await loadSwal();
      await Swal.fire({ icon: 'success', title: 'Successfully Buy Items! Na Bodol ka Bossing! 🤞' });
    } catch (err) {
   
      alert('Successfully Buy Items!');
    }

   
    setCartItems([]);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col gap-6">
    
  <div className="w-full bgcolorbtncart bg-white shadow p-4 top-0 z-10 fixed flex flex-col md:flex-row gap-3 items-center justify-center">
    <div className="mb-20 max-[769px]:hidden" >
      <span className="font-semibold texthover text-xs  absolute top-0 left-4 text-white cursor-pointer">Seller Centre <span className="textseparation ">|</span></span>
      <span className="font-semibold texthover text-xs absolute top-0 left-24 text-white cursor-pointer">Start Selling <span className="textseparation ">|</span></span>
      <span className="font-semibold texthover text-xs absolute top-0 left-43 text-white cursor-pointer">Download <span className="textseparation ">|</span></span>
      <span className="font-semibold text-xs absolute top-0 left-59 text-white cursor-pointer">Follow us on <IoLogoFacebook className="inline-block h-4 w-4 fbhover" /></span>
      <span className="font-semibold text-xs absolute top-0 left-290 text-white cursor-pointer"><IoIosNotifications className="inline-block h-6 w-6 belnotif" />Notifications</span>
      <span className="font-semibold  text-xs absolute top-0 left-320 text-white cursor-pointer">Log in <span className="textseparation ">|</span> Sign up</span>

    

    </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-2 py-1 w-full md:w-2/5 custom-input"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-2 py-1 w-full md:w-1/6 custom-input"
          >
            <option value="">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="border rounded-lg px-2 py-1 w-20 custom-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="border rounded-lg px-2 py-1 w-18 custom-input"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-2 py-3 w-full md:w-1/6 custom-input"
          >
            <option value="All">All</option>
            <option value="beauty">Beauty</option>
            <option value="furniture">Furniture</option>
            <option value="fragrances">Fragrances</option>
            <option value="groceries">Groceries</option>
          </select>

         
        </div>
        <main className="mt-32 md:mt-20 mb-10 ">
           <h1 className="text-3xl  max-[600px]:text-2xl  max-[600px]:mt-40 mt-25 max-[769px]:mt-40 font-bold mb-6 text-center">🛍️ OnlyFangs Store</h1>
             <div className="mt-6 flex items-center justify-center gap-3">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
                <div className="px-3 py-1 rounded bg-white border">Page {currentPage}</div>
                <button onClick={() => goToPage(currentPage + 1)} disabled={paginated.length < pageSize} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
              </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 custom-input">No products found.</p>
          ) : (
            <>
              <div className="mb-6 mt-4">
                <FeaturedCarousel items={filtered.slice(0, 5)} onBuy={handleBuy} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((product) => (
                  <Card key={product.id} product={product} onBuy={handleBuy} />
                ))}
              </div>

          
              <div className="mt-6 flex items-center justify-center gap-3">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
                <div className="px-3 py-1 rounded bg-white border">Page {currentPage}</div>
                <button onClick={() => goToPage(currentPage + 1)} disabled={paginated.length < pageSize} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
              </div>
            </>
          )}
        </main>

        <div className="fixed bottom-6 max-[600px]:bottom-20 lg:bottom-4 right-6 z-50">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bgcolorbtncart text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
            aria-label="Open cart"
          >
             <HiShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold bg-white text-blue-600 rounded-full">{cartItems.length}</span>
          </button>
        </div>

        {/* cart moDal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 ">
            <div className="bg-white rounded-lg w-11/12 md:w-2/3 max-h-[80vh] overflow-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Your Cart ({cartItems.length})</h3>
                <div className="flex items-center gap-2">
                  <button onClick={handleBuyAll} className="px-3 py-1 bg-green-600 text-white rounded">Buy all</button>
                  <button onClick={() => setIsCartOpen(false)} className="px-3 py-1 border rounded">Close</button>
                </div>
              </div>
              <Cart items={cartItems} onRemove={handleRemoveFromCart} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
