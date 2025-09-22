import { useEffect, useState } from "react";
import Card from "./components/Card";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [category, setCategory] = useState("All");

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
    let result = [...products];

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
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

    setFiltered(result);
  }, [search, sort, priceRange, category, products]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🛍️ Product Store</h1>

      <div className="flex flex-col md:flex-row gap-6">
      
        <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow p-4 h-fit">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>

     
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full mb-4 custom-input"
          />

          <label className="block text-sm font-medium mb-1">Sort</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full mb-4 custom-input"
          >
            <option value="">Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

      
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Number(e.target.value), priceRange[1]])
              }
              className="border rounded-lg px-2 py-1 w-20 custom-input"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="border rounded-lg px-2 py-1 w-20 custom-input"
            />
          </div>

          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full custom-input"
          >
            <option value="All">All</option>
            <option value="beauty">Beauty</option>
            <option value="furniture">Furniture</option>
            <option value="fragrances">Fragrances</option>
            <option value="groceries">Groceries</option>
          </select>
        </aside>


        <main className="flex-1">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-10 custom-input">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  description={product.description}
                  images={product.images}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
