import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 6)); // show only 6 products
  }, [products]);

  return (
    <div className="my-10">
      {/* Header with Title and View All link */}
      <div className="relative text-center py-8">
        <Title text1={"LATEST"} text2={"COLLECTION"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest high-protein nutrition products designed for
          convenience, great taste, and everyday energy.
        </p>
        {/* View All link - positioned at top right on desktop, below on mobile */}
        <div className="absolute top-0 right-0 mt-2 mr-2 sm:static sm:mt-0 sm:mr-0 sm:text-right sm:mb-4">
          <Link
            to="/collection"
            className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors duration-200 bg-white/80 px-3 py-1.5 rounded-full shadow-sm hover:shadow"
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.images}
            name={item.name}
            price={item.price}
            discountPrice={item.discountPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;