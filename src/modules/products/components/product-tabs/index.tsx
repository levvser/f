"use client";

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Refresh from "@modules/common/icons/refresh";
import Accordion from "./accordion";
import React from "react";

type CustomPricedProduct = PricedProduct & {
  material?: {
    CARATTERISTICHE?: Record<string, string>;
    SPECIFICHE?: Record<string, string>;
    "Accessori inclusi"?: string[];
  };
};

type ProductTabsProps = {
  product: CustomPricedProduct;
};

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
  const tabs = [
    {
      label: "Informazioni prodotti",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Accessori",
      component: <AccessoriTab accessori={product.material?.["Accessori inclusi"]} />,
    },
    {
      label: "Spedizioni & resi",
      component: <ShippingInfoTab />,
    },
  ];

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item key={i} title={tab.label} headingSize="medium" value={tab.label}>
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

const ProductInfoTab: React.FC<{ product: CustomPricedProduct }> = ({ product }) => {
  let isOdd = true; // Start with true for the first row

  const renderRow = (label: string, value: string) => {
    const row = (
      <tr className={isOdd ? "bg-gray-50" : "bg-white"} key={label}>
        <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
        <td className="p-2 text-gray-900 text-left">{value}</td>
      </tr>
    );
    isOdd = !isOdd; // Toggle isOdd after each rendered row
    return row;
  };

  const caratteristicheRows = product.material?.CARATTERISTICHE
    ? Object.entries(product.material.CARATTERISTICHE).map(([label, value]) =>
        renderRow(label, value)
      )
    : [];

  const specificheRows = product.material?.SPECIFICHE
    ? Object.entries(product.material.SPECIFICHE).map(([label, value]) =>
        renderRow(label, value)
      )
    : [];

  return (
    <div className="text-small-regular py-4">
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
  let isOdd = true; // Start with true for the first row

  const renderRow = (item: string, index: number) => {
    const row = (
      <tr className={isOdd ? "bg-gray-50" : "bg-white"} key={index}>
        <td className="p-2 text-gray-900 text-left">{item}</td>
      </tr>
    );
    isOdd = !isOdd; // Toggle isOdd after each rendered row
    return row;
  };

  const rows = accessori?.map((item, index) => renderRow(item, index)) || [];

  return (
    <div className="text-small-regular py-4">
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
            <span className="font-semibold">Spedizione veloce</span>
            <p className="max-w-sm">
              Il pacchetto arriverà entro 3-5 giorni lavorativi presso il luogo di ritiro o nel comfort di casa tua.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Scambi semplici</span>
            <p className="max-w-sm">
              La misura non è del tutto corretta? Nessun problema, scambieremo il tuo prodotto con uno nuovo.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Resi facili</span>
            <p className="max-w-sm">
              Restituisci il tuo prodotto; Ti rimborseremo i tuoi soldi. Ci assicureremo che il tuo ritorno sia senza problemi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
