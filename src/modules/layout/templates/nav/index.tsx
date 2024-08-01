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
      <span className="text-violet-700">Spedizione gratuita</span>
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
  const [navClass, setNavClass] = useState("absolute top-12");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 48) {
        setNavClass("fixed top-0 transition-transform duration-300 ease-in-out backdrop-blur-3xl bg-white bg-opacity-70");
      } else {
        setNavClass("absolute top-12 transition-transform duration-300 ease-in-out bg-white bg-opacity-70");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collectionLinks = [
    { href: "it/collections/macchine-per-cucire", label: "Per Cucire" },
    { href: "it/collections/macchine-per-cucire", label: "Per Ricamare" },
    { href: "it/collections/macchine-per-cucire-e-ricamare", label: "Cucire e Ricama" },
    { href: "it/collections/scannerizza-taglia", label: "Scan e Taglia" },
    { href: "it/collections/termopresse", label: "Termopresse" },
    { href: "it/collections/Stiro", label: "Stiro" },
  ];

  return (
    <header className={`w-full z-50 ${navClass}`}>
      <nav className="content-container text-violet-900 flex items-center justify-between h-16 text-xs sm:text-base">
        <div className="flex-1 h-full flex items-center justify-start px-4">
          <LocalizedClientLink
            href="/"
            className="text-lg sm:text-xl font-bold hover:text-violet-950 uppercase whitespace-nowrap"
            data-testid="nav-store-link"
          >
            ARTECUCIRE STORE
          </LocalizedClientLink>
        </div>

        <div className="hidden md:flex items-center gap-x-2 sm:gap-x-4 h-full">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="hover:text-violet-950"
            >
              {link.label}
            </LocalizedClientLink>
          ))}
        </div>

        <div className="flex items-center gap-x-3 sm:gap-x-4 h-full flex-1 justify-end px-4">
          <LocalizedClientLink
            className="hover:text-violet-950"
            href="/search"
            scroll={false}
            data-testid="nav-search-link"
          >
            <FiSearch size={20} className="text-violet-900 hover:text-violet-950" />
          </LocalizedClientLink>
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
          <div className="md:hidden h-full flex items-center">
            <SideMenu regions={regions} />
          </div>
        </div>
      </nav>
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
