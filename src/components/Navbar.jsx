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
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center h-14 mx-4 lg:mx-14">
          <div className="flex items-center flex-shrink-0">
            {/* <img
              className="h-20 w-15 mr-2 object-cover"
              src={logo}
              alt="Logo"
            /> */}
            <span className="text-xl tracking-tight text-white">
              Fitness Club
            </span>
          </div>

          {/* Desktop Navigation */}
          {/* <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-gray-300 hover:text-purple-400 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.href);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul> */}

          {/* Desktop Buttons */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="#"
              className="py-2 px-3 border rounded-md text-gray-300 border-gray-500 hover:bg-gray-800 transition"
            >
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-blue-500 to-purple-800 py-2 px-3 rounded-md text-white hover:opacity-90 transition"
            >
              Create an account
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar} className="text-gray-300">
              {mobileDrawerOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-20 flex flex-col items-start justify-start pt-24 px-6 bg-neutral-900 lg:hidden min-h-screen">
            {/* Close Button */}
            <button
              onClick={toggleNavbar}
              className="absolute top-5 right-5 text-gray-300 hover:text-red-400 transition"
            >
              <X size={30} />
            </button>

            {/* Mobile Nav Items */}
            <ul className="w-full">
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-blue-400 transition"
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
                className="py-2 px-3 border rounded-md text-gray-300 border-gray-500 hover:bg-gray-800 transition"
              >
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-purple-500 to-purple-800 text-white hover:opacity-90 transition"
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
