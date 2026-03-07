import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

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

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-[#fdf6ec]/90 backdrop-blur-xl shadow-md"
          : "bg-[#fdf6ec]/70 backdrop-blur-lg"
          } border-b border-amber-100`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 items-center">

          {/* LEFT */}
          <div className="flex items-center gap-6 px-2 sm:px-[1vw] md:px-[1vw] ">
            {/* Hamburger */}
            <button
              onClick={() => setVisible(true)}
              className="lg:hidden p-2 rounded-full hover:bg-amber-100 transition-all hover:scale-110"
            >
              <div className="flex flex-col gap-1">
                <span className="w-6 h-[2px] bg-gray-800"></span>
                <span className="w-6 h-[2px] bg-gray-800"></span>
                <span className="w-6 h-[2px] bg-gray-800"></span>
              </div>
            </button>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex gap-8 text-sm font-semibold">
              {[
                { path: "/", label: "HOME" },
                { path: "/collection", label: "SHOP" },
                { path: "/about", label: "ABOUT" },
                { path: "/contact", label: "CONTACT" },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative transition-all duration-300 ${isActive
                      ? "text-amber-700"
                      : "text-gray-700 hover:text-amber-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* CENTER LOGO (No Absolute Now) */}
          <div className="flex justify-center">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Crave Nutri"
                className="w-42 transition-all duration-500 hover:scale-110"
              />
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end gap-5">

            {/* Search */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-amber-100 transition-transform hover:scale-110"
            >
              <img src={assets.search_icon} className="w-6" alt="search" />
            </button>

            {/* Profile Desktop */}
            <div className="hidden md:block relative group">
              <button
                onClick={() => (!token ? navigate("/login") : null)}
                className="p-2 rounded-full hover:bg-amber-100 transition-transform hover:scale-110"
              >
                <img src={assets.profile_icon} className="w-6" alt="profile" />
              </button>

              {token && (
                <div className="absolute right-0 mt-4 w-44 bg-white shadow-xl rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <button
                    onClick={() => navigate("/orders")}
                    className="block w-full px-5 py-3 text-left hover:bg-amber-50"
                  >
                    My Orders
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full px-5 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-full hover:bg-amber-100 transition-transform hover:scale-110"
            >
              <img src={assets.cart_icon} className="w-6" alt="cart" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>


      {/* ================= MOBILE SIDEBAR ================= */}
      {/* <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 md:hidden ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        />

        <div
          className={`absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white/80 backdrop-blur-2xl shadow-2xl transform transition-transform duration-700 ${
            visible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b text-xl font-bold text-emerald-700">
            Crave Nutri 🌿
          </div>

          <nav className="flex flex-col p-6 gap-4">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="px-6 py-4 rounded-xl text-lg transition-all duration-300 hover:bg-emerald-100 hover:pl-10"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {path === "/" ? "Home" : path.replace("/", "")}
              </NavLink>
            ))}
          </nav>
        </div>
      </div> */}
      {/* ================= MOBILE SIDEBAR ================= */}
      <div
  className={`fixed inset-0 z-50 transition-opacity duration-500 ${
    visible ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setVisible(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 h-full w-4/5 max-w-sm bg-white/80 backdrop-blur-2xl shadow-2xl transform transition-transform duration-700 ${visible ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="p-6 border-b text-xl font-bold text-emerald-700">
            <Link to="/">
              <img
                src={assets.logo}
                alt="Crave Nutri"
                className="w-36 transition-all duration-500 hover:scale-110"
              />
            </Link>          </div>


          {/* MAIN LINKS */}
          <nav className="flex flex-col p-6 gap-3">
            {[
              { path: "/", label: "Home" },
              { path: "/collection", label: "Shop" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact" },
            ].map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setVisible(false)}
                className="px-6 py-3 rounded-xl text-lg transition-all duration-300 hover:bg-emerald-100 hover:pl-10"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* ACCOUNT SECTION */}
          <div className="border-t border-gray-200 mt-4 pt-4 px-6">
            <p className="text-sm text-gray-500 mb-3">Account</p>

            {!token ? (
              /* ---------- NOT LOGGED IN ---------- */
              <button
                onClick={() => {
                  navigate("/login");
                  setVisible(false);
                }}
                className="w-full text-left px-6 py-3 rounded-xl text-lg transition-all duration-300 hover:bg-emerald-100 hover:pl-10"
              >
                Login
              </button>
            ) : (
              /* ---------- LOGGED IN ---------- */
              <>
                <button
                  onClick={() => {
                    navigate("/orders");
                    setVisible(false);
                  }}
                  className="w-full text-left px-6 py-3 rounded-xl text-lg transition-all duration-300 hover:bg-emerald-100 hover:pl-10"
                >
                  My Orders
                </button>

                <button
                  onClick={() => {
                    logout();
                    setVisible(false);
                  }}
                  className="w-full text-left px-6 py-3 rounded-xl text-lg text-red-600 transition-all duration-300 hover:bg-red-50 hover:pl-10"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>

    </>
  );
};

export default Navbar;
