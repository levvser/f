"use client";

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Refresh from "@modules/common/icons/refresh";
import Accordion from "./accordion";
import React from "react";

type MaterialType = {
  CARATTERISTICHE?: Record<string, string>;
  SPECIFICHE?: Record<string, string>;
  "Accessori inclusi"?: string[];
};

type CustomPricedProduct = PricedProduct & {
  material?: MaterialType | string | null;
};

type ProductTabsProps = {
  product: CustomPricedProduct;
};

const parseMaterial = (
  material: string | MaterialType | null | undefined
): MaterialType | undefined => {
  if (typeof material === "string") {
    try {
      return JSON.parse(material);
    } catch (e) {
      console.error("Failed to parse material JSON:", e);
      return undefined;
    }
  }
  return material ?? undefined;
};

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const parsedMaterial = parseMaterial(product.material);

  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab material={parsedMaterial} />,
    },
    {
      label: "Accessori",
      component: <AccessoriTab accessori={parsedMaterial?.["Accessori inclusi"]} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

const ProductInfoTab: React.FC<{ material?: MaterialType }> = ({
  material,
}) => {
  const caratteristicheRows = material?.CARATTERISTICHE
    ? Object.entries(material.CARATTERISTICHE).map(([label, value]) => (
        <tr key={label}>
          <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
          <td className="p-2 text-gray-900 text-left">{value}</td>
        </tr>
      ))
    : [];

  const specificheRows = material?.SPECIFICHE
    ? Object.entries(material.SPECIFICHE).map(([label, value]) => (
        <tr key={label}>
          <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
          <td className="p-2 text-gray-900 text-left">{value}</td>
        </tr>
      ))
    : [];

  return (
    <div className="text-small-regular py-8">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {caratteristicheRows}
          {specificheRows}
        </tbody>
      </table>
    </div>
  );
};

const AccessoriTab: React.FC<{ accessori?: string[] }> = ({ accessori }) => {
  const rows = accessori?.map((item, index) => (
    <tr key={index}>
      <td className="p-2 text-gray-900 text-left">{item}</td>
    </tr>
  )) || [];

  return (
    <div className="text-small-regular py-8">
      <table className="w-full table-auto border-collapse">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

const ShippingInfoTab: React.FC = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
