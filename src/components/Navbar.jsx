import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Healthy Diet", href: "/nutrition" },
  { label: "Sleep Wellness Guide", href: "/sleep" },
  { label: "Mental Wellness", href: "/mental-health" },
  { label: "Fitness Wellness", href: "/fitness" },
  { label: "Products", href: "/product-reviews" },
  { label: "View All", href: "/all-categories" },
];

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.5 },
  exit: { opacity: 0 },
};

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white/90 border-b border-gray-300 shadow-sm">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center h-14 mx-4 lg:mx-14">
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-wide font-semibold text-gray-900">
              Fitness Club
            </span>
          </div>

          {/* Hamburger Menu Button - visible on all screen sizes */}
          <button
            onClick={toggleNavbar}
            aria-label={mobileDrawerOpen ? "Close menu" : "Open menu"}
            className="text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
          >
            {mobileDrawerOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Backdrop and Animated Mobile Drawer */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={backdropVariants}
                transition={{ duration: 0.3 }}
                onClick={toggleNavbar}
                className="fixed inset-0 z-10 bg-black"
                style={{ pointerEvents: "auto" }}
              />

              {/* Drawer */}
              <motion.div
                key="drawer"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={drawerVariants}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 z-20 h-[100vh] w-64 bg-white shadow-lg border-l border-gray-200 flex flex-col p-6"
              >
                {/* Heading and Close Button in one row */}
                <div className="flex items-center justify-between mb-8 border-b border-indigo-300 pb-3">
                  <h2 className="text-2xl font-extrabold tracking-wide text-indigo-700">
                    Fitness Wellness
                  </h2>
                  <button
                    onClick={toggleNavbar}
                    aria-label="Close menu"
                    className="text-gray-900 hover:text-indigo-600 transition"
                  >
                    <X size={30} />
                  </button>
                </div>

                {/* Navigation Links */}
                <ul className="flex flex-col space-y-6 text-lg font-medium">
                  {navItems.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        to={href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className="text-gray-900 hover:text-indigo-600 transition"
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
      </div>
    </nav>
  );
};

export default Navbar;
