import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";


const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-black text-primary-navy tracking-tight font-montserrat flex items-center">
            <img className="w-50 h-10" src="/logo2.png" alt="" />
          </h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm font-semibold transition-colors duration-200 ${path === "/"
              ? "text-accent-orange"
              : "text-slate-600 hover:text-accent-orange"
              }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`text-sm font-semibold transition-colors duration-200 ${path === "/about"
              ? "text-accent-orange"
              : "text-slate-600 hover:text-accent-orange"
              }`}
          >
            About
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className={`text-sm font-semibold transition-colors duration-200 ${path === "/dashboard"
                ? "text-accent-orange"
                : "text-slate-600 hover:text-accent-orange"
                }`}
            >
              Dashboard
            </Link>
          )}

          {!token && (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-semibold text-slate-600 hover:text-accent-orange transition-colors"
              >
                Log In
              </Link>
              <Link to="/register">
                <button className="cursor-pointer bg-accent-orange hover:bg-accent-orange-hover text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-sm shadow-orange-100 hover:shadow-md transition duration-200">
                  Sign Up Free
                </button>
              </Link>
            </div>
          )}

          {token && (
            <button
              onClick={onLogOutHandler}
              className="cursor-pointer bg-primary-navy hover:bg-primary-navy-dark text-white px-5 py-2 rounded-lg text-sm font-semibold transition duration-200"
            >
              Log Out
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden text-3xl text-slate-700 p-1 hover:bg-slate-50 rounded-lg transition-colors"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden ${navbarOpen ? "max-h-72 border-b border-slate-100" : "max-h-0"
          } bg-white`}
      >
        <div className="flex flex-col px-6 py-4 gap-4">
          <Link
            to="/"
            onClick={() => setNavbarOpen(false)}
            className={`text-base font-semibold ${path === "/" ? "text-accent-orange" : "text-slate-700"
              }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            onClick={() => setNavbarOpen(false)}
            className={`text-base font-semibold ${path === "/about" ? "text-accent-orange" : "text-slate-700"
              }`}
          >
            About
          </Link>

          {token && (
            <Link
              to="/dashboard"
              onClick={() => setNavbarOpen(false)}
              className={`text-base font-semibold ${path === "/dashboard" ? "text-accent-orange" : "text-slate-700"
                }`}
            >
              Dashboard
            </Link>
          )}

          {!token && (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setNavbarOpen(false)}
                className="text-center py-2 text-base font-semibold text-slate-700 border border-slate-200 rounded-lg"
              >
                Log In
              </Link>
              <Link to="/register" onClick={() => setNavbarOpen(false)}>
                <button className="w-full cursor-pointer bg-accent-orange hover:bg-accent-orange-hover text-white py-2.5 rounded-lg text-base font-semibold transition">
                  Sign Up Free
                </button>
              </Link>
            </div>
          )}

          {token && (
            <button
              onClick={() => {
                onLogOutHandler();
                setNavbarOpen(false);
              }}
              className="w-full cursor-pointer bg-primary-navy hover:bg-primary-navy-dark text-white py-2.5 rounded-lg text-base font-semibold transition"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;