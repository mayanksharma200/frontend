// Navbar.jsx
import { Menu, X } from "lucide-react";
import { useState } from "react";
// import logo from "../assets/logos/newest/newestSize1.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleNavigation = (href) => {
    setMobileDrawerOpen(false);
    setTimeout(() => {
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white/90 border-b border-gray-300 shadow-sm">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center h-14 mx-4 lg:mx-14">
          <div className="flex items-center flex-shrink-0">
            {/* <img
              className="h-20 w-15 mr-2 object-cover"
              src={logo}
              alt="Logo"
            /> */}
            <span className="text-xl tracking-wide font-semibold text-gray-900">
              Fitness Club
            </span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="#"
              className="py-2 px-4 border rounded-lg text-gray-700 border-gray-400 hover:bg-gray-100 transition shadow-sm"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-purple-600 to-indigo-700 py-2 px-5 rounded-lg text-white shadow-md hover:opacity-90 transition"
            >
              Create an account
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-center">
            <button onClick={toggleNavbar} className="text-gray-900">
              {mobileDrawerOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-20 flex flex-col items-start justify-start pt-24 px-6 bg-white min-h-screen shadow-lg">
            {/* Close Button */}
            <button
              onClick={toggleNavbar}
              className="absolute top-5 right-5 text-gray-900 hover:text-purple-600 transition"
            >
              <X size={30} />
            </button>

            {/* Mobile Nav Items */}
            <ul className="w-full">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="py-4 border-b border-gray-200 w-full"
                >
                  <a
                    href={item.href}
                    className="text-gray-900 hover:text-purple-600 transition block w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Buttons */}
            <div className="flex space-x-6 mt-6">
              <a
                href="#"
                className="py-2 px-4 border rounded-lg text-gray-700 border-gray-400 hover:bg-gray-100 transition shadow-sm"
              >
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:opacity-90 transition shadow-md"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
