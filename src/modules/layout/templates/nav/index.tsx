"use client";

import React, { useEffect, useState, useCallback, memo } from "react";
import {
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX
} from "react-icons/fi"; 
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";
import { debounce } from "lodash";

// Italian flag square SVG
const ItalianFlagIcon = memo(() => (
  <svg width="20" height="20" viewBox="0 0 3 2" aria-hidden="true">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce2b37" />
  </svg>
));

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);

  const handleResize = useCallback(debounce(() => {
    setIsMobile(window.innerWidth < 768);
  }, 300), []);

  const handleScroll = useCallback(debounce(() => {
    const isScrolled = window.scrollY > 10;
    if (!isMobile) {
      setNavClass(
        isScrolled
          ? "fixed top-0 bg-white z-50 pt-4 transition-all duration-500 ease-in-out"
          : "fixed top-0 bg-white z-50 pt-10 transition-all duration-500 ease-in-out"
      );
    } else {
      setShowMobileSearchBar(!isScrolled);
    }
  }, 100), [isMobile]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleResize, handleScroll]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (isMobileMenuOpen && !(event.target as HTMLElement).closest(".mobile-menu")) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen, handleClickOutside]);

  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Acquista i prodotti" },
    { href: "/collections/macchine-per-ricamare", label: "Esplora gli ambienti" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Offerte" },
    { href: "/collections/scannerizza-taglia", label: "Ispirazione" },
    { href: "/collections/termopresse", label: "IKEA for Business" },
    { href: "/collections/stiro", label: "Servizi e progettazione" },
    { href: "#", label: "Altro" },
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
              aria-label="Artecucire home"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          <div className={`flex items-center ${showMobileSearchBar ? 'hidden' : 'block'} md:hidden`}>
            <button onClick={() => setShowSearchModal(true)} aria-label="Open search modal">
              <FiSearch size={24} className="text-gray-700" />
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 hover:bg-gray-200 transition w-full max-w-lg rounded-lg"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center"
              href="/account"
              aria-label="Accedi"
            >
              <span className="mr-1 font-medium">Accedi</span>
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center"
              href="/cart"
              aria-label="Shopping cart"
            >
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <div className="flex items-center">
              <ItalianFlagIcon />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
              {isMobileMenuOpen ? <FiX size={24} className="text-gray-700" /> : <FiMenu size={24} className="text-gray-700" />}
            </button>
          </div>
        </div>

        {isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 transition-opacity duration-500 ease-in-out">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg"
              aria-label="Search"
            >
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}

        <div className="hidden md:flex justify-center bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 text-gray-400">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="relative hover:text-gray-900 transition-colors duration-300"
            >
              {link.label}
            </LocalizedClientLink>
          ))}
        </div>
      </header>

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
