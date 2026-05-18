import React, { useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShopContext } from "../contexts/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import SEO from "../components/SEO";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  /* ================= TOGGLE FUNCTIONS ================= */

  const toggleCategory = (value) => {
    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // const toggleSubCategory = (value) => {
  //   setSelectedSubCategory((prev) =>
  //     prev.includes(value)
  //       ? prev.filter((item) => item !== value)
  //       : [...prev, value]
  //   );
  // };

  const clearFilters = () => {
    setSelectedCategory([]);
    setSelectedSubCategory([]);
    setSortType("relevant");
  };

  /* ================= FILTER LOGIC ================= */

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategory.includes(item.category)
      );
    }

    if (selectedSubCategory.length > 0) {
      filtered = filtered.filter((item) =>
        selectedSubCategory.includes(item.subCategory)
      );
    }

    if (sortType === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [
    products,
    search,
    showSearch,
    selectedCategory,
    selectedSubCategory,
    sortType,
  ]);

  const categories = [...new Set(products.map((p) => p.category))];
  // const subCategories = [...new Set(products.map((p) => p.subCategory))];

  // Count active filters
  const activeFilterCount =
    selectedCategory.length + selectedSubCategory.length;

  /* ================= ANIMATIONS ================= */

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <>
      <SEO
        title="Shop Healthy Snacks & Nutrition Products | CraveNutri"
        description="Explore healthy snacks, protein bars, cookies, wellness products, and nutritious foods at CraveNutri."
        url="https://cravenutri.com/collection"
        image="https://cravenutri.com/cravenutriicon.png"
      />
      <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 py-10 px-4 sm:px-6 lg:px-8 bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto bg-[#FFFBF7]">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Title text1={"OUR"} text2={"COLLECTION"} />
              <p className="text-sm text-gray-500 mt-1">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden relative flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  onChange={(e) => setSortType(e.target.value)}
                  value={sortType}
                  className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer"
                >
                  <option value="relevant">Sort: Relevant</option>
                  <option value="low-high">Price: Low → High</option>
                  <option value="high-low">Price: High → Low</option>
                </select>
                <svg
                  className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ================= DESKTOP LAYOUT ================= */}
          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/30">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-orange-500 to-pink-500 rounded-full"></span>
                  Filters
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-300"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sub Categories (if any) */}
                {/* {subCategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Type
                  </h4>
                  <div className="space-y-2">
                    {subCategories.map((sub) => (
                      <label
                        key={sub}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubCategory.includes(sub)}
                          onChange={() => toggleSubCategory(sub)}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-300"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              )} */}

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-orange-600 hover:text-orange-800 font-medium underline underline-offset-2 transition"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* ================= PRODUCT GRID ================= */}
            <div className="flex-1">
              <motion.div
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((item) => (
                      <motion.div
                        key={item._id}
                        variants={itemVariants}
                        exit={{ opacity: 0, scale: 0.9 }}
                        layout
                      >
                        <ProductItem
                          id={item._id}
                          name={item.name}
                          price={item.price}
                          discountPrice={item.discountPrice} // pass discount if exists
                          image={item.images}
                        />
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center py-16"
                    >
                      <div className="inline-block p-8 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl">
                        <svg
                          className="w-20 h-20 text-gray-400 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-xl text-gray-600 mb-2">
                          No products found
                        </p>
                        <p className="text-gray-400">
                          Try adjusting your filters
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ================= MOBILE FILTER DRAWER ================= */}
        <AnimatePresence>
          {showMobileFilters && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black z-40"
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="fixed right-0 top-0 h-full w-80 bg-white z-50 p-6 shadow-2xl overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="rounded border-gray-300 text-orange-500"
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sub Categories */}
                {/* {subCategories.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Type
                  </h4>
                  <div className="space-y-2">
                    {subCategories.map((sub) => (
                      <label
                        key={sub}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubCategory.includes(sub)}
                          onChange={() => toggleSubCategory(sub)}
                          className="rounded border-gray-300 text-orange-500"
                        />
                        {sub}
                      </label>
                    ))}
                  </div>
                </div>
              )} */}

                {/* Actions */}
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>

  );
};

export default Collection;