"use client";

import React, { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
} from "react-icons/fa";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const AlertBar: React.FC = () => (
  <div className="bg-gradient-to-r from-purple-100 via-white to-pink-100 border-b border-violet-300 py-2 px-4 text-violet-900 flex justify-center items-center text-xs sm:text-sm z-50 fixed top-0 w-full">
    <div className="flex items-center mx-2">
      <FaInfoCircle size={14} className="mr-2 text-violet-700" />
      <span>Spedizione gratuita da € 100</span>
    </div>
    <div className="flex items-center mx-2">
      <FaCheckCircle size={14} className="mr-2 text-violet-700" />
      <span>Garanzia inclusa</span>
    </div>
    <div className="flex items-center mx-2">
      <FaExclamationTriangle size={14} className="mr-2 text-violet-700" />
      <span>Servizio Assistenza</span>
    </div>
  </div>
);

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("absolute top-12"); // Changed from 0 to 12 to make space for alert bar
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setNavClass("fixed top-12 bg-opacity-80 backdrop-blur-xl z-50 shadow-md");
      } else {
        setNavClass("absolute top-12 bg-opacity-80 backdrop-blur-xl z-50");
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

  const productPreview: { [key: string]: { img: string; name: string }[] } = {
    "Cucire": [
      { img: "/img/product1.jpg", name: "Macchina Cucire 1" },
      { img: "/img/product2.jpg", name: "Macchina Cucire 2" }
    ],
    "Ricamare": [
      { img: "/img/product3.jpg", name: "Macchina Ricamare 1" },
      { img: "/img/product4.jpg", name: "Macchina Ricamare 2" }
    ],
  };

  return (
    <>
      {/* Alert Bar fixed at the top */}
      <AlertBar />

      <header className={`${navClass} w-full`}>
        {/* First line: Brand, Search, Assistance, User, Cart */}
        <div className="content-container relative text-violet-900 flex items-center justify-between h-16 text-sm sm:text-base px-4 md:px-12">
          <div className="flex-1 flex items-center justify-start">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold hover:text-violet-800 tracking-tight uppercase"
              data-testid="nav-store-link"
            >
              ARTECUCIRE
            </LocalizedClientLink>
          </div>

          <div className="hidden md:flex items-center justify-center">
            {/* Search Button */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="border rounded-full px-4 py-2 bg-white bg-opacity-50 text-violet-600 text-left shadow-sm hover:bg-opacity-75 backdrop-blur-md transition"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cerca prodotti</span>
            </button>
          </div>

          <div className="hidden md:flex items-center justify-end space-x-4">
            {/* Assistance Button */}
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-full flex items-center shadow-sm hover:bg-green-700 transition"
              onClick={() => window.open("https://wa.me/123456789", "_blank")}
            >
              <FaWhatsapp className="mr-2" />
              Assistenza
            </button>
            <LocalizedClientLink
              className="hover:text-violet-800"
              href="/account"
              data-testid="nav-account-link"
            >
              <FiUser size={24} className="text-violet-700 hover:text-violet-800" />
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-violet-800"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <FiShoppingCart size={24} className="text-violet-700 hover:text-violet-800" />
            </LocalizedClientLink>
          </div>

          {/* Mobile Menu */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiSearch size={24} className="text-violet-700" />
            <SideMenu regions={regions} />
          </button>
        </div>

        {/* Second line: Section Links with fade effect on corners */}
        <div className="hidden md:flex justify-center bg-transparent py-2 border-t border-b border-violet-300 text-sm font-medium space-x-6 relative z-10">
          <div className="absolute left-0 top-0 w-1/6 h-full bg-gradient-to-r from-transparent to-white pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-1/6 h-full bg-gradient-to-l from-transparent to-white pointer-events-none"></div>
          {collectionLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(link.label)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <LocalizedClientLink
                href={link.href}
                className="hover:text-violet-900"
              >
                {link.label}
              </LocalizedClientLink>

              {/* Product preview on hover */}
              {hoveredCategory === link.label && (
                <div className="absolute left-0 top-full w-64 p-4 bg-white shadow-lg border border-violet-200 z-50">
                  {productPreview[link.label]?.map((product) => (
                    <div key={product.name} className="flex items-center mb-2">
                      <img src={product.img} alt={product.name} className="w-12 h-12 object-cover mr-3" />
                      <span>{product.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search Modal with Blurred Background */}
        {showSearchModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center backdrop-blur-sm">
            <div className="bg-white p-4 w-full max-w-3xl mx-4 md:mx-auto rounded-lg shadow-xl">
              <input
                type="text"
                placeholder="Cerca prodotti..."
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

        {/* Mobile menu items */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16">
            <div className="w-full bg-white shadow-lg">
              {collectionLinks.map((link) => (
                <LocalizedClientLink
                  key={link.href}
                  href={link.href}
                  className="block py-4 text-center border-b border-violet-200 w-full text-violet-900 font-medium"
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
