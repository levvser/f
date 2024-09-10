"use client";

import React, { useEffect, useState } from "react";
import {
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX
} from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
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

// Define product categories (IKEA style but simplified)
const productCategories = {
  "acquista-prodotti": [
    { label: "Per Cucire", image: "https://www.example.com/image1.jpg", href: "/cucire" },
    { label: "Per Ricamare", image: "https://www.example.com/image2.jpg", href: "/ricamare" },
    { label: "Per Cucire e Ricamare", image: "https://www.example.com/image3.jpg", href: "/cucire-e-ricamare" },
  ],
  "esplora-gli-ambienti": "Explore different rooms and spaces",
  "offerte": "Current offers and promotions",
  "ispirazione": "Get inspired by our latest designs",
  "ikea-for-business": "Solutions for business needs",
  "servizi-e-progettazione": "Services and design help",
};

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeCategory, setActiveCategory] = useState<keyof typeof productCategories>("acquista-prodotti");

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as HTMLElement).closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Navigation links (IKEA style)
  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Acquista i prodotti" },
    { href: "/collections/macchine-per-ricamare", label: "Esplora gli ambienti" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Offerte" },
    { href: "/collections/scannerizza-taglia", label: "Ispirazione" },
    { href: "/collections/termopresse", label: "IKEA for Business" },
    { href: "/collections/stiro", label: "Servizi e progettazione" },
  ];

  return (
    <>
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
              data-testid="nav-store-link"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} className="text-gray-700" /> : <FiMenu size={24} className="text-gray-700" />}
            </button>
          </div>

          {/* Search Bar on Desktop */}
          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button onClick={() => setShowSearchModal(true)} className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 w-full max-w-lg rounded-lg">
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink href="/account" className="hover:text-gray-700 flex items-center">
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="hover:text-gray-700 flex items-center">
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <div className="hover:text-gray-700 flex items-center">
              <ItalianFlagIcon />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {!isMobileMenuOpen && isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600">
            <button onClick={() => setShowSearchModal(true)} className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg">
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}

        {/* Render Product Categories */}
        <div className="bg-gray-100 p-4">
          {typeof productCategories[activeCategory] === "string" ? (
            <div>{productCategories[activeCategory]}</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {productCategories[activeCategory].map((category, index) => (
                <LocalizedClientLink key={index} href={category.href}>
                  <div className="flex flex-col items-center">
                    <img src={category.image} alt={category.label} className="w-20 h-20" />
                    <span>{category.label}</span>
                  </div>
                </LocalizedClientLink>
              ))}
            </div>
          )}
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 max-w-7xl mx-auto text-gray-400">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="relative hover:text-gray-900 transition-colors duration-300"
            >
              <span>{link.label}</span>
              <span className="absolute inset-0 transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-100 rounded-full transition duration-300"></span>
            </LocalizedClientLink>
          ))}
        </div>
      </header>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-4 w-full max-w-3xl mx-4 md:mx-auto rounded-lg shadow-xl">
            <input type="text" placeholder="Cosa stai cercando?" className="border border-gray-300 p-3 rounded-lg w-full" />
            <button className="mt-2 px-4 py-2 bg-violet-600 text-white rounded-lg" onClick={() => setShowSearchModal(false)}>
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

const SomePage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await medusaClient.regions.list();
        setRegions(response.regions);
      } catch (error) {
        medusaError(error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="relative">
      <Nav regions={regions} />
      <div className="pt-24"></div>
      <div className="hero-bg"></div>
    </div>
  );
};

export default SomePage;
