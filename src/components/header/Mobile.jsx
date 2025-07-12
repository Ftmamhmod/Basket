import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // <-- Import this
import Logo from "./Logo";
import { CiMenuFries } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Search from "./Search";
import Navigation from "./Navigation";

export default function Mobile_Header() {
  const [showMenu, setShowMenu] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation(); 


  useEffect(() => {
    if (!showMenu) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY !== lastScrollY.current) {
            setShowMenu(false);
            lastScrollY.current = window.scrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showMenu]);


  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <div className="w-full py-3">
      <div className="flex justify-between items-center w-full">
        <div
          className={`text-2xl font-bold text-[#009689] rotate-180 ml-2 cursor-pointer z-50 transition-all duration-300  ${
            showMenu ? "absolute top-10 left-2" : ""
          }`}
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <IoCloseSharp /> : <CiMenuFries />}
        </div>

        <Logo />
      </div>

      {showMenu && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-white z-40 py-20 px-4 min-h-screen overflow-hidden"
        >
          <div className="flex flex-col-reverse justify-center items-center w-full">
            <Search />
            <Navigation />
          </div>
        </motion.div>
      )}
    </div>
  );
}
