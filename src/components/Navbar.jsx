import React, { useContext, useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import logoDark from "../assets/frontend_assets/logo-dark.png";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  const location = useLocation();

  useEffect(() => setVisible(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const cartCount = getCartCount();

  // Logo switching
  const logoSrc = scrolled ? logoDark : assets.logo;

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-xl shadow-md" 
          : "bg-[#fdf6ec]/70 backdrop-blur-lg"
      } border-b border-amber-100`}>
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">
          <div className="flex items-center gap-6">
            <button onClick={() => setVisible(true)} className="lg:hidden p-2 rounded-full hover:bg-amber-100">
              <div className="flex flex-col gap-1">
                <span className={`w-6 h-[2px] ${scrolled ? "bg-white" : "bg-gray-800"}`}></span>
                <span className={`w-6 h-[2px] ${scrolled ? "bg-white" : "bg-gray-800"}`}></span>
                <span className={`w-6 h-[2px] ${scrolled ? "bg-white" : "bg-gray-800"}`}></span>
              </div>
            </button>
            <ul className="hidden lg:flex gap-8 text-sm font-semibold">
              <NavLink to="/" className={({isActive}) => 
                `relative transition-colors duration-300 ${
                  isActive 
                    ? (scrolled ? "text-amber-400" : "text-amber-700")
                    : (scrolled ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-700")
                }`
              }>HOME</NavLink>
              <NavLink to="/collection" className={({isActive}) => 
                `relative transition-colors duration-300 ${
                  isActive 
                    ? (scrolled ? "text-amber-400" : "text-amber-700")
                    : (scrolled ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-700")
                }`
              }>SHOP</NavLink>
              <NavLink to="/about" className={({isActive}) => 
                `relative transition-colors duration-300 ${
                  isActive 
                    ? (scrolled ? "text-amber-400" : "text-amber-700")
                    : (scrolled ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-700")
                }`
              }>ABOUT</NavLink>
              <NavLink to="/contact" className={({isActive}) => 
                `relative transition-colors duration-300 ${
                  isActive 
                    ? (scrolled ? "text-amber-400" : "text-amber-700")
                    : (scrolled ? "text-white hover:text-amber-400" : "text-gray-700 hover:text-amber-700")
                }`
              }>CONTACT</NavLink>
            </ul>
          </div>
          <div className="flex justify-center">
            <Link to="/">
              <img 
                src={logoSrc} 
                alt="CraveNutri" 
                className="w-42 hover:scale-110 transition"
              />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-5">
            <button onClick={() => setShowSearch(true)} className={`p-2 rounded-full transition-colors duration-300 ${
              scrolled ? "hover:bg-white/10" : "hover:bg-amber-100"
            }`}>
              <img src={assets.search_icon} className={`w-6 ${scrolled ? "brightness-0 invert" : ""}`} alt="search"/>
            </button>
            <div className="hidden md:block relative group">
              <button onClick={() => !token && navigate("/login")} className={`p-2 rounded-full transition-colors duration-300 ${
                scrolled ? "hover:bg-white/10" : "hover:bg-amber-100"
              }`}>
                <img src={assets.profile_icon} className={`w-6 ${scrolled ? "brightness-0 invert" : ""}`} alt="profile"/>
              </button>
              {token && (
                <div className="absolute right-0 mt-4 w-44 bg-white shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button onClick={()=>navigate("/orders")} className="block w-full px-5 py-3 text-left hover:bg-amber-50">My Orders</button>
                  <button onClick={logout} className="block w-full px-5 py-3 text-left text-red-600 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
            <Link to="/cart" className={`relative p-2 rounded-full transition-colors duration-300 ${
              scrolled ? "hover:bg-white/10" : "hover:bg-amber-100"
            }`}>
              <img src={assets.cart_icon} className={`w-6 ${scrolled ? "brightness-0 invert" : ""}`} alt="cart"/>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
      {/* Mobile sidebar */}
      {visible && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={()=>setVisible(false)}>
          <div className="absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white/80 backdrop-blur-2xl shadow-2xl p-6">
            <div className="flex justify-between">
              <Link to="/"><img src={assets.logo} className="w-36"/></Link>
              <button onClick={()=>setVisible(false)} className="text-gray-500">✕</button>
            </div>
            <nav className="flex flex-col gap-3 mt-8">
              <Link to="/" onClick={()=>setVisible(false)} className="px-6 py-3 rounded-xl hover:bg-emerald-100">Home</Link>
              <Link to="/collection" onClick={()=>setVisible(false)} className="px-6 py-3 rounded-xl hover:bg-emerald-100">Shop</Link>
              <Link to="/about" onClick={()=>setVisible(false)} className="px-6 py-3 rounded-xl hover:bg-emerald-100">About</Link>
              <Link to="/contact" onClick={()=>setVisible(false)} className="px-6 py-3 rounded-xl hover:bg-emerald-100">Contact</Link>
            </nav>
            <div className="mt-auto pt-6 border-t">
              {!token ? 
                <button onClick={()=>{navigate("/login"); setVisible(false)}} className="w-full text-left px-6 py-3">Login</button> 
                : 
                <>
                  <button onClick={()=>{navigate("/orders"); setVisible(false)}} className="w-full text-left px-6 py-3">My Orders</button>
                  <button onClick={logout} className="w-full text-left px-6 py-3 text-red-600">Logout</button>
                </>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;