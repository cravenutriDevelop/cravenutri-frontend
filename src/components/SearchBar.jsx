import React, { useContext, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const {
    search,
    showSearch,
    setSearch,
    setShowSearch,
    products,
  } = useContext(ShopContext);

  // Live Search Results
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return [];

    return products
      .filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0, 6);
  }, [search, products]);

  if (!showSearch) return null;

  return (
    <div className="w-full border-b bg-white shadow-md sticky top-[72px] z-[999]">
      <div className="max-w-4xl mx-auto px-4 py-4 relative">

        {/* SEARCH INPUT */}
        <div className="flex items-center border border-gray-300 rounded-full px-5 py-3 bg-gray-50">
          <input
            className="flex-1 outline-none bg-transparent text-sm"
            type="text"
            placeholder="Search healthy snacks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <img
            className="w-5 opacity-70"
            src={assets.search_icon}
            alt="search"
          />

          <button
            onClick={() => {
              setShowSearch(false);
              setSearch("");
            }}
            className="ml-4"
          >
            <img
              className="w-4 opacity-60 hover:opacity-100"
              src={assets.cross_icon}
              alt="close"
            />
          </button>
        </div>

        {/* SEARCH RESULTS */}
        {search.trim() && (
          <div className="absolute left-0 right-0 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[1000]">

            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                  }}
                  className="flex items-center gap-4 p-4 hover:bg-orange-50 transition border-b last:border-b-0"
                >
                  <img

                    src={
                      typeof item.images?.[0] === "string"
                        ? item.images[0]
                        : item.images?.[0]?.url
                    }
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.category}
                    </p>
                  </div>

                  <div className="font-semibold text-orange-600">
                    ₹{item.price}
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No products found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;