"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi"; 
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Region as MedusaRegion } from "@medusajs/medusa";

// Italian flag square SVG
const ItalianFlagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce2b37" />
  </svg>
);

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [activeCategory, setActiveCategory] = useState("acquista-prodotti"); // Make "Acquista i prodotti" active by default
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6"); 
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && window.scrollY > 10) {
        if (!scrollTimeout) {
          const timeout = setTimeout(() => {
            setShowMobileSearchBar(false);
            setScrollTimeout(null);
          }, 300);
          setScrollTimeout(timeout);
        }
      } else {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          setScrollTimeout(null);
        }
        setShowMobileSearchBar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isMobile, scrollTimeout]);

  const collectionLinks = [
    { href: "#", label: "Acquista i prodotti", id: "acquista-prodotti" },
    { href: "#", label: "Esplora gli ambienti", id: "esplora-ambienti" },
    { href: "#", label: "Offerte", id: "offerte" },
    { href: "#", label: "Ispirazione", id: "ispirazione" },
    { href: "#", label: "IKEA for Business", id: "ikea-business" },
    { href: "#", label: "Servizi e progettazione", id: "servizi" },
    { href: "#", label: "Altro", id: "altro" },
  ];

  const productCategories = [
    {
      label: "Mobili",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Mobili e accessori da esterno",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Organizzare e contenere",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Letti e materassi",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Tessili",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Decorazioni casa",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Illuminazione",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
    {
      label: "Cucine ed elettrodomestici",
      image: "https://www.ikea.com/globalassets/image.jpg", // Placeholder image
    },
  ];

  return (
    <>
      {/* First Line: Logo, Search Bar, and Icons */}
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          <div className="flex items-center">
            <LocalizedClientLink href="/" className="text-2xl font-semibold tracking-tight text-gray-800">
              Artecucire
            </LocalizedClientLink>
          </div>

          <div className="flex items-center md:hidden space-x-4">
            <button className="flex items-center" onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button className="flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} className="text-gray-700" /> : <FiMenu size={24} className="text-gray-700" />}
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button onClick={() => setShowSearchModal(true)} className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200 transition w-full max-w-lg rounded-lg">
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink href="/account" className="hover:text-gray-700 flex items-center relative group">
              <span className="mr-1 font-medium">Accedi</span>
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="hover:text-gray-700 flex items-center relative group">
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <div className="hover:text-gray-700 flex items-center relative group">
              <ItalianFlagIcon />
            </div>
          </div>
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-start bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10 max-w-7xl mx-auto text-gray-400">
          {collectionLinks.map((link) => (
            <button
              key={link.id}
              className={`relative hover:text-gray-900 transition-colors duration-300 ${activeCategory === link.id ? "text-black font-bold" : ""}`}
              onClick={() => setActiveCategory(link.id)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </header>

      {/* Display Categories for Acquista i Prodotti */}
      {activeCategory === "acquista-prodotti" && (
        <div className="flex justify-center items-center py-4 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {productCategories.map((category) => (
              <div key={category.label} className="text-center">
                <img src={category.image} alt={category.label} className="w-full h-24 object-cover mb-2" />
                <span className="text-sm font-medium">{category.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-4 w-full max-w-3xl mx-4 md:mx-auto rounded-lg shadow-xl">
            <input
              type="text"
              placeholder="Cosa stai cercando?"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
            <button
              className="mt-2 px-4 py-2 bg-violet-600 text-white rounded-lg"
              onClick={() => setShowSearchModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16 mobile-menu">
          <div className="w-full bg-white shadow-lg">
            <LocalizedClientLink href="/account" className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium">
              Accedi
            </LocalizedClientLink>
            {collectionLinks.map((link) => (
              <LocalizedClientLink key={link.href} href={link.href} className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium">
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
