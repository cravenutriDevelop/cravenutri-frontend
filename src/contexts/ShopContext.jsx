import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 10;
  const backendUrl = 'https://cravenutri-backend-9kd7.onrender.com';
  // const backendUrl ='https://cravenutri-backend.onrender.com';
  // const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({}); // { productId: quantity }
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const navigate = useNavigate();

  // Helper to transform backend cart items array to flat object
  // Handles both populated product objects and plain string IDs
  const transformCartItems = (items) => {
    const cart = {};
    if (Array.isArray(items)) {
      items.forEach((item) => {
        let productId;
        // If product is populated (object with _id)
        if (item.product && typeof item.product === 'object' && item.product._id) {
          productId = item.product._id;
        }
        // If product is just a string ID
        else if (item.product && typeof item.product === 'string') {
          productId = item.product;
        } else {
          return; // skip invalid entries
        }
        cart[productId] = item.quantity;
      });
    }
    return cart;
  }; 

  // Add to cart
  const addToCart = async (productId) => {
    if (!token) {
      toast.error("Please login to add items to cart");
      return;
    }

    const prevCart = { ...cartItems };
    const newQuantity = (cartItems[productId] || 0) + 1;
    setCartItems({ ...cartItems, [productId]: newQuantity });

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/add`,
        { productId },
        { headers: { token } }
      );

      if (response.data.success) {
        const updatedCart = transformCartItems(response.data.cart.items);
        setCartItems(updatedCart);
        toast.success("Added to cart");
      } else {
        setCartItems(prevCart);
        toast.error(response.data.message || "Error adding to cart");
      }
    } catch (error) {
      setCartItems(prevCart);
      console.error(error);
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  // Get total cart count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // Update quantity (if quantity <= 0, remove item)
  const updateQuantity = async (productId, quantity) => {
    if (!token) return;

    const prevCart = { ...cartItems };
    const newCart = { ...cartItems };
    if (quantity <= 0) {
      delete newCart[productId];
    } else {
      newCart[productId] = quantity;
    }
    setCartItems(newCart);

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/update`,
        { productId, quantity },
        { headers: { token } }
      );

      if (response.data.success) {
        const updatedCart = transformCartItems(response.data.cart.items);
        setCartItems(updatedCart);
      } else {
        setCartItems(prevCart);
        toast.error(response.data.message || "Error updating cart");
      }
    } catch (error) {
      setCartItems(prevCart);
      console.error(error);
      toast.error(error.response?.data?.message || "Error updating cart");
    }
  };

  // Get total cart amount
  const getCartAmount = () => {
    let total = 0;
    for (const productId in cartItems) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        total += product.price * cartItems[productId];
      }
    }
    return total;
  };

  // Fetch all products (public)
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching products");
    }
  };

  // Fetch user's cart
  const getUserCart = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const items = response.data.cart?.items || [];
        setCartItems(transformCartItems(items));
      } else {
        toast.error(response.data.message || "Error fetching cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error fetching cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    getProductsData();
    if (token) {
      getUserCart();
    } else {
      setCartItems({});
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;