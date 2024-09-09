"use client";

import React, { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
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
  <div className="bg-gradient-to-r from-purple-100 via-white to-pink-100 border-b border-violet-300 py-3 px-1 text-violet-900 flex justify-center items-center text-xs sm:text-sm shadow-none">
    <div className="flex items-center mx-2">
      <FaInfoCircle size={12} className="mr-1 text-violet-700 hover:text-violet-900" />
      <span className="text-violet-700">Spedizione gratuita da € 100</span>
    </div>
    <div className="flex items-center mx-2">
      <FaCheckCircle size={12} className="mr-1 text-violet-700 hover:text-violet-900" />
      <span className="text-violet-700">Garanzia</span>
    </div>
    <div className="flex items-center mx-2">
      <FaExclamationTriangle size={12} className="mr-1 text-violet-700 hover:text-violet-900" />
      <span className="text-violet-700">Assistenza</span>
    </div>
  </div>
);

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("absolute top-11");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 48) {
        setNavClass("fixed top-0 transition-transform duration-300 ease-in-out backdrop-blur-3xl bg-white bg-opacity-60");
      } else {
        setNavClass("absolute top-12 transition-transform duration-300 ease-in-out");
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
    ]
  };

  return (
    <header className={`w-full bg-opacity-60 z-50 ${navClass}`}>
      {/* First line: Brand, Search, Assistance, User, Cart, Italy */}
      <div className="content-container text-violet-900 flex items-center justify-between h-16 text-xs sm:text-base">
        <div className="flex-1 flex items-center justify-start px-4">
          <LocalizedClientLink
            href="/"
            className="text-lg sm:text-xl font-bold hover:text-violet-950 uppercase whitespace-nowrap"
            data-testid="nav-store-link"
          >
            ARTECUCIRE
          </LocalizedClientLink>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg p-1 px-2 w-full max-w-sm"
          />
        </div>

        <div className="flex-1 flex items-center justify-end gap-x-3 sm:gap-x-4 px-4">
          <button className="hover:text-violet-950">Assistenza</button>
          <LocalizedClientLink
            className="hover:text-violet-950"
            href="/account"
            data-testid="nav-account-link"
          >
            <FiUser size={20} className="text-violet-900 hover:text-violet-950" />
          </LocalizedClientLink>
          <LocalizedClientLink
            className="hover:text-violet-950"
            href="/cart"
            data-testid="nav-cart-link"
          >
            <FiShoppingCart size={20} className="text-violet-900 hover:text-violet-950" />
          </LocalizedClientLink>
          <div className="hidden md:flex items-center">
            <div className="ml-2">
              <svg width="24" height="16" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="8" height="16" fill="#008C45" rx="2" ry="2" />
                <rect x="8" width="8" height="16" fill="#F4F5F0" rx="2" ry="2" />
                <rect x="16" width="8" height="16" fill="#CD212A" rx="2" ry="2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Second line: Section Links */}
      <div className="content-container text-violet-900 flex items-center justify-center h-12 text-sm sm:text-base border-t border-b border-violet-300">
        {collectionLinks.map((link) => (
          <div
            key={link.href}
            className="mx-4 relative"
            onMouseEnter={() => setHoveredCategory(link.label)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <LocalizedClientLink
              href={link.href}
              className="hover:text-violet-950"
            >
              {link.label}
            </LocalizedClientLink>

            {/* Third line: Product preview on hover */}
            {hoveredCategory === link.label && (
              <div className="absolute left-0 top-full w-64 p-4 bg-white shadow-md border border-violet-200">
                {productPreview[link.label]?.map((product) => (
                  <div key={product.name} className="flex items-center mb-2">
                    <img src={product.img} alt={product.name} className="w-12 h-12 object-cover mr-2" />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
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
      <AlertBar />
      <Nav regions={regions} />
      <div className="pt-16"></div> {/* Adjusted spacer to ensure content is visible */}
      {/* Your hero section goes here */}
      <div className="hero-bg">
        {/* Hero background content */}
      </div>
      {/* Other components */}
    </div>
  );
};

export default SomePage;
