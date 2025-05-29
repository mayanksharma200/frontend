import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Videos", href: "/videos" },
  { label: "Healthy Diet", href: "/nutrition" },
  { label: "Sleep Wellness Guide", href: "/sleep" },
  { label: "Mental Wellness", href: "/mental-health" },
  { label: "Fitness Wellness", href: "/fitness" },
  { label: "Products", href: "/product-reviews" },
  { label: "View All", href: "/all-categories" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="relative w-full z-50 bg-white border-b border-gray-100">
      {/* --- Top Logo Row --- */}
      <div className="flex justify-between items-center px-4 md:px-10 py-7 md:py-8">
        <div className="block min-w-[44px]" />
        <Link
          to="/"
          className="flex-1 flex items-center justify-center select-none"
          style={{ textDecoration: "none" }}
        >
          {/* Animated gradient heading with underline */}
          <div className="flex flex-col items-center w-full">
            <motion.h1
              className="text-4xl  sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", delay: 0.15 }}
              style={{ letterSpacing: "-0.03em", fontFamily: "inherit" }}
            >
              Fitness Club
            </motion.h1>
            <motion.div
              className="h-1 bg-gradient-to-r from-indigo-400 to-blue-300 rounded-full mt-1 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ delay: 0.32, duration: 0.7 }}
              style={{ maxWidth: "220px", width: "80%" }}
            />
          </div>
        </Link>
        {/* Hamburger/toggle icon: only on large screens and up */}
        <div className="min-w-[44px] flex justify-end">
          <button
            aria-label="Open menu"
            className="rounded-full bg-gray-900 hover:bg-gray-800 text-white w-10 h-10 items-center justify-center focus:outline-none hidden lg:flex"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* --- Desktop Menu (centered row, only on lg+) --- */}
      <div className="hidden lg:flex justify-center gap-8 pt-1 pb-2">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            to={href}
            className={`text-base font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition
              ${
                location.pathname === href
                  ? "text-indigo-700 font-bold"
                  : "text-gray-900"
              }
            `}
            style={{ whiteSpace: "nowrap" }}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* --- Mobile horizontal scroll nav (below logo, only on mobile/md) --- */}
      <div className="lg:hidden px-2 pb-2 -mt-3">
        <nav
          className="flex gap-4 overflow-x-auto scrollbar-none"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {navItems.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className={`text-sm font-medium py-2 px-4 rounded-full border border-transparent whitespace-nowrap transition
                ${
                  location.pathname === href
                    ? "bg-indigo-600 text-white font-bold"
                    : "bg-gray-100 text-gray-900 hover:bg-indigo-50"
                }
              `}
              style={{
                flex: "0 0 auto",
              }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* --- Drawer (toggle menu) only on lg+ screens --- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              key="nav-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 33 }}
              className="fixed top-0 right-0 z-50 h-full w-[85vw] max-w-xs bg-white shadow-xl border-l border-gray-200 flex flex-col"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  Fitness Club
                </span>
                <button
                  className="rounded-full bg-gray-900 text-white w-10 h-10 flex items-center justify-center"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              {/* Drawer links - scrollable */}
              <ul
                className="flex flex-col py-4 px-6 gap-3 overflow-y-auto flex-1 min-h-0"
                style={{ maxHeight: "calc(100vh - 80px)" }}
              >
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      onClick={() => setOpen(false)}
                      className="block text-lg py-3 font-medium text-gray-900 hover:text-indigo-600 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
