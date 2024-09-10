"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"; // Add FiX for "X" icon and Chevron icons for scroll
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

const Nav: React.FC<{ regions: Region[] }> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const thirdRowRef = useRef<HTMLDivElement>(null); // Reference to third row for scrolling

  // Sample images and sublinks data
  const sublinks = [
    { href: "/collections/sublink1", label: "Sublink 1", img: "/images/img1.jpg" },
    { href: "/collections/sublink2", label: "Sublink 2", img: "/images/img2.jpg" },
    { href: "/collections/sublink3", label: "Sublink 3", img: "/images/img3.jpg" },
    { href: "/collections/sublink4", label: "Sublink 4", img: "/images/img4.jpg" },
  ];

  // Navigation links (second row)
  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Acquista i prodotti" },
    { href: "/collections/macchine-per-ricamare", label: "Esplora gli ambienti" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Offerte" },
    { href: "/collections/scannerizza-taglia", label: "Ispirazione" },
    { href: "/collections/termopresse", label: "IKEA for Business" },
    { href: "/collections/stiro", label: "Servizi e progettazione" },
    { href: "#", label: "Altro" },
  ];

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
        setShowMobileSearchBar(true);
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

  // Scroll the third row horizontally
  const scrollThirdRow = (direction: "left" | "right") => {
    if (thirdRowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300; // Adjust the scroll amount as needed
      thirdRowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className={`${navClass} w-full`}>
        {/* First Row: Logo, Search, Icons */}
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          {/* Text Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Mobile Icons (Search and Hamburger) */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/account"
            >
              <span className="mr-1 font-medium">Accedi</span>
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart">
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <ItalianFlagIcon />
          </div>
        </div>

        {/* Second Row: Links */}
        <div className="hidden md:flex justify-center py-3 border-t border-gray-200 text-sm font-medium space-x-6">
          {collectionLinks.map((link) => (
            <LocalizedClientLink key={link.href} href={link.href}>
              {link.label}
            </LocalizedClientLink>
          ))}
        </div>

        {/* Third Row: Scrollable Subsections */}
        <div className="hidden md:flex items-center justify-between px-10 lg:px-16 py-4 border-t border-gray-200">
          {/* Left Scroll Arrow */}
          <button onClick={() => scrollThirdRow("left")} className="p-2">
            <FiChevronLeft size={24} />
          </button>

          {/* Scrollable Content */}
          <div
            className="flex space-x-4 overflow-x-auto no-scrollbar"
            ref={thirdRowRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {sublinks.map((sublink) => (
              <LocalizedClientLink
                key={sublink.href}
                href={sublink.href}
                className="min-w-[200px] flex flex-col items-center"
              >
                <img src={sublink.img} alt={sublink.label} className="w-full h-auto" />
                <span className="text-sm text-gray-600 mt-2">{sublink.label}</span>
              </LocalizedClientLink>
            ))}
          </div>

          {/* Right Scroll Arrow */}
          <button onClick={() => scrollThirdRow("right")} className="p-2">
            <FiChevronRight size={24} />
          </button>
        </div>

        {/* Mobile Search Bar with Icon - Hide when hamburger is active */}
        {!isMobileMenuOpen && isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600 transition-opacity duration-500 ease-in-out opacity-100">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg"
            >
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}
      </header>

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
            <LocalizedClientLink
              href="/account"
              className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
            >
              Accedi
            </LocalizedClientLink>
            {collectionLinks.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const IndexPage: React.FC = () => {
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

export default IndexPage;
