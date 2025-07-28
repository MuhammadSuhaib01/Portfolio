import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
      {/* Navbar Content */}
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center  justify-between py-2 sm:py-0">
          <a
            href="#"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Suhaib
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointertext-neutral-400 hover:text-white foucs:outline-none sm:hidden"
          >
            {!isOpen ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
