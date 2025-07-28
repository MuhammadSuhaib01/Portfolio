import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home" },
    { name: "About" },
    { name: "Projects" },
    { name: "Experiences" },
    { name: "Contact" },
  ];

  const navItemClasses =
    "hover:text-blue-300 transition-colors duration-300 cursor-pointer py-2 px-3 rounded-md hover:bg-blue-900/20";

  return (
    <nav className="flex justify-between items-center bg-primary text-primary-text p-4 mx-auto sticky top-0 z-30">
      <div className="text-xl font-bold">Suhaib</div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <ul className="flex space-x-8 items-center">
          {navItems.map((item) => (
            <li key={item.name} className={navItemClasses}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden z-50"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-primary/95 z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ top: "3.5rem" }} // Matches your navbar height
      >
        <ul className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <li
              key={item.name}
              className={`${navItemClasses} text-xl`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
