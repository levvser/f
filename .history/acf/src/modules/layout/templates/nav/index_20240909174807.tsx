"use client";

import React, { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
} from "react-icons/fa";
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiMenu } from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";

// Updated Color Palette and Premium Text
const palette = {
  primary: "#7B3FE4", // Vibrant Purple
  secondary: "#FF72A6", // Soft Pink
  accent: "#5B41FF", // Accent Blue
  background: "#F8F9FA", // Background light shade
  text: "#1A1A1A", // Darker text color
  mutedText: "#6E6E6E", // Muted Text for subtle elements
};

const textStyles = {
  premium: "font-semibold tracking-tight text-lg",
  regular: "font-normal text-base",
  muted: "font-light text-sm text-mutedText",
};

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const AlertBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Show/hide the alert bar based on scrolling direction with slide up animation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollPos) {
        setIsVisible(false); // Slide up when scrolling down
      } else {
        setIsVisible(true); // Slide down when scrolling up
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`bg-gradient-to-r from-${palette.secondary} via-white to-${palette.primary} border-b border-${palette.accent} py-2 px-4 text-${palette.primary} flex justify-center items-center text-xs sm:text-sm z-50 fixed top-0 w-full transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center mx-2">
        <FaInfoCircle size={14} className="mr-2 text-violet-700" />
        <span className={textStyles.premium}>Spedizione gratuita da € 100</span>
      </div>
      <div className="flex items-center mx-2">
        <FaCheckCircle size={14} className="mr-2 text-violet-700" />
        <span className={textStyles.premium}>Garanzia inclusa</span>
      </div>
      <div className="flex items-center mx-2">
        <FaExclamationTriangle size={14} className="mr-2 text-violet-700" />
        <span className={textStyles.premium}>Servizio Assistenza</span>
      </div>
    </div>
  );
};

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-10 bg-white z-50");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavClass("fixed top-0 bg-white z-50");
      } else {
        setNavClass("fixed top-10 bg-white z-50");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Cucire" },
    { href: "/collections/macchine-per-ricamare", label: "Ricamare" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Cucire e Ricamare" },
    { href: "/collections/scannerizza-taglia", label: "Scan e Taglia" },
    { href: "/collections/termopresse", label: "Termopresse" },
    { href: "/collections/stiro", label: "Stiro" },
  ];

  return (
    <>
      <AlertBar />

      <header className={`${navClass} w-full bg-${palette.background}`}>
        {/* First Line: Logo (Brand Name), Search Bar, and Icons */}
        <div className="content-container relative text-${palette.text} flex items-center justify-between h-16 px-4 md:px-12">
          {/* Logo Text (ArteCucire) on the left */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold hover:text-${palette.primary} tracking-tight uppercase"
              data-testid="nav-store-link"
            >
              ArteCucire
            </LocalizedClientLink>
          </div>

          {/* Search Bar in the center */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-full max-w-2xl flex items-center">
              <button
                onClick={() => setShowSearchModal(true)}
                className="w-full border rounded-full py-2 px-4 bg-gray-100 text-gray-600 text-left shadow-sm hover:bg-gray-200 transition"
              >
                <FiSearch className="inline-block mr-2" />
                <span>Cosa stai cercando?</span>
              </button>

              {/* Shortened WhatsApp Assistance Button */}
              <button
                onClick={() => window.open("https://wa.me/39123456789", "_blank")}
                className="ml-4 py-2 px-3 bg-${palette.primary} text-white rounded-full flex items-center text-sm hover:bg-${palette.accent} transition"
              >
                <FaWhatsapp className="mr-2" />
                <span>Assistenza gratuita +39 123456789</span>
              </button>
            </div>
          </div>

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="hover:text-${palette.accent}">
              <FiHeart size={24} />
            </button>
            <LocalizedClientLink
              className="hover:text-${palette.accent} flex items-center"
              href="/account"
              data-testid="nav-account-link"
            >
              <FiUser size={24} className="mr-1" />
              <span className={textStyles.premium}>Accedi</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-${palette.accent}"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <FiShoppingCart size={24} />
            </LocalizedClientLink>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu size={24} className="text-${palette.text}" />
          </button>
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-2 border-t border-${palette.accent} text-sm font-medium space-x-6 relative z-10">
          {collectionLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(link.label)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <LocalizedClientLink
                href={link.href}
                className="hover:text-${palette.primary}"
              >
                {link.label}
              </LocalizedClientLink>

              {/* Hover effect with product preview */}
              {hoveredCategory === link.label && (
                <div className="absolute left-0 top-full w-64 p-4 bg-white shadow-lg border border-${palette.accent} z-50">
                  <p>Preview for {link.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>

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
                className="mt-2 px-4 py-2 bg-${palette.primary} text-white rounded-lg"
                onClick={() => setShowSearchModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Mobile menu items */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16">
            <div className="w-full bg-white shadow-lg">
              {collectionLinks.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-center border-b border-gray-200 w-full text-${palette.text} font-medium"
                >
                  {link.label}
                </LocalizedClientLink>
              ))}
            </div>
          </div>
        )}
      </header>
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
      <div className="pt-16"></div> {/* Adjusted spacer to ensure content is visible */}
      {/* Hero section */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default SomePage;