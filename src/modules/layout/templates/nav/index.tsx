"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi"; // Add FiX for "X" icon
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

// Define the valid category keys
type CategoryKey =
  | "acquista-prodotti"
  | "esplora-gli-ambienti"
  | "offerte"
  | "ispirazione"
  | "ikea-for-business"
  | "servizi-e-progettazione";

// Define the product categories
const productCategories: Record<CategoryKey, { label: string; image: string }[] | string> = {
  "acquista-prodotti": [
    { label: "Per Cucire", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
    { label: "Per Ricamare", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
    { label: "Per Cucire e Ricamare", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
    { label: "Scan e Taglia", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
    { label: "Termopresse", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
    { label: "Stiro", image: "https://www.artecucire.com/_next/image?url=https%3A%2F%2Fac-bucket.fra1.digitaloceanspaces.com%2F27-XT-MACCHINA-FAMIGLIA-27-PUNTI-CROCHET-ROTATIVO-ORIZZONTALE-IN-ACCIAIO-1724367417229.jpg&w=828&q=50" },
  ],
  "esplora-gli-ambienti": "Random content for 'Esplora gli ambienti'",
  "offerte": "Random content for 'Offerte'",
  "ispirazione": "Random content for 'Ispirazione'",
  "ikea-for-business": "Random content for 'IKEA for Business'",
  "servizi-e-progettazione": "Random content for 'Servizi e Progettazione'",
};

interface NavProps {
  regions: Region[];
}

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6"); // Reduced top padding for mobile
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // State for managing the active category
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("acquista-prodotti");

  // Handle screen size to check if it's mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll behavior with delayed animations
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && window.scrollY > 10) {
        // Delay the appearance/disappearance with a timeout for a smoother effect
        if (!scrollTimeout) {
          const timeout = setTimeout(() => {
            setShowMobileSearchBar(false);
            setScrollTimeout(null);
          }, 300); // Delay for smooth animation
          setScrollTimeout(timeout);
        }
      } else {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          setScrollTimeout(null);
        }
        setShowMobileSearchBar(true); // Show mobile search bar with smooth animation
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isMobile, scrollTimeout]);

  // Close menu when clicking outside
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

  // Navigation links
  const collectionLinks = [
    { href: "acquista-prodotti", label: "Acquista i prodotti" },
    { href: "esplora-gli-ambienti", label: "Esplora gli ambienti" },
    { href: "offerte", label: "Offerte" },
    { href: "ispirazione", label: "Ispirazione" },
    { href: "ikea-for-business", label: "IKEA for Business" },
    { href: "servizi-e-progettazione", label: "Servizi e progettazione" },
    { href: "#", label: "Altro" },
  ];

  return (
    <>
      {/* First Line: Logo (Text), Search Bar, and Icons */}
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          {/* Text Logo: Artecucire on the left */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
              data-testid="nav-store-link"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Mobile Icons (Search and Hamburger) */}
          <div className="flex items-center md:hidden space-x-4">
            <button className="flex items-center" onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button className="flex items-center" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} className="text-gray-700" /> : <FiMenu size={24} className="text-gray-700" />}
            </button>
          </div>

          {/* Search Bar on Desktop */}
          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200 transition w-full max-w-lg rounded-lg"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/account"
              data-testid="nav-account-link"
            >
              <span className="mr-1 font-medium">Accedi</span>
              <div className="relative flex items-center">
                <FiUser size={20} />
                <div className="absolute inset-0 z-[-1] transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-100 rounded-full transition duration-300"></div>
              </div>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <div className="relative flex items-center">
                <FiShoppingCart size={20} />
                <div className="absolute inset-0 z-[-1] transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-100 rounded-full transition duration-300"></div>
              </div>
            </LocalizedClientLink>
            <div className="hover:text-gray-700 flex items-center relative group">
              <div className="relative flex items-center">
                <ItalianFlagIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar with Icon - Hide when hamburger is active */}
        {!isMobileMenuOpen && isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600 transition-opacity duration-500 ease-in-out opacity-100">
            <button onClick={() => setShowSearchModal(true)} className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg">
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-start bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10 max-w-7xl mx-auto text-gray-400">
          {collectionLinks.map((link) => (
            <button
              key={link.href}
              className={`relative hover:text-gray-900 transition-colors duration-300 ${activeCategory === link.href ? "text-black" : ""}`}
              onClick={() => setActiveCategory(link.href as CategoryKey)}
            >
              {link.label}
              <span className="absolute inset-0 transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-100 rounded-full transition duration-300"></span>
            </button>
          ))}
        </div>
      </header>

      {/* Display the content based on the active category */}
      <div className="bg-gray-100 p-4">
        {/* Product Categories for 'Acquista i prodotti' */}
        {activeCategory === "acquista-prodotti" && Array.isArray(productCategories[activeCategory]) && (
          <div className="grid grid-cols-3 gap-4">
            {(productCategories[activeCategory] as { label: string; image: string }[]).map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <img src={category.image} alt={category.label} className="w-20 h-20" />
                <span>{category.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Show random content for other categories */}
        {typeof productCategories[activeCategory] === "string" && (
          <div>{productCategories[activeCategory]}</div>
        )}
      </div>

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
            <LocalizedClientLink
              href="/account"
              className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
            >
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
        const response = await medusaClient.regions.list();  // Fetch regions from Medusa
        setRegions(response.regions);
      } catch (error) {
        medusaError(error);  // Handle any errors
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="relative">
      <Nav regions={regions} />
      <div className="pt-24"></div> {/* Adjusted spacer to ensure more blank space above the hero section */}
      {/* Hero section */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default SomePage;
