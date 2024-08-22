"use client";

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Refresh from "@modules/common/icons/refresh";
import Accordion from "./accordion";
import React from "react";

type CustomAttribute = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  type: string;
  handle: string;
  filterable: boolean | null;
  metadata: any;
  values: {
    id: string;
    created_at: string;
    updated_at: string;
    value: string;
    metadata: any;
    rank: number;
  }[];
};

type CustomPricedProduct = PricedProduct & {
  custom_attributes?: CustomAttribute[];
};

type ProductTabsProps = {
  product: CustomPricedProduct;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const getAttributeValue = (
    attrName: string,
    allowedValues: string[]
  ): string | undefined => {
    return product.custom_attributes
      ?.find((attr: CustomAttribute) => attr.name === attrName)
      ?.values.find((value) => allowedValues.includes(value.value))?.value;
  };

  const INFORMAZIONI_PRODOTTO_VALUES = process.env.NEXT_PUBLIC_INFORMAZIONI_PRODOTTO?.split(",") || [];
  const INFORMAZIONI_PRODOTTO_ATTRIBUTE = getAttributeValue("INFORMAZIONI_PRODOTTO", INFORMAZIONI_PRODOTTO_VALUES);

  const ACCESSORI_VALUES = process.env.NEXT_PUBLIC_ACCESSORI?.split(",") || [];
  const ACCESSORI_ATTRIBUTE = getAttributeValue("ACCESSORI", ACCESSORI_VALUES);

  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab informazioniProdotto={INFORMAZIONI_PRODOTTO_ATTRIBUTE} />,
    },
    {
      label: "Accessori",
      component: <AccessoriTab accessori={ACCESSORI_ATTRIBUTE} />,
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

const ProductInfoTab = ({ informazioniProdotto }: { informazioniProdotto?: string }) => {
  const renderRow = (label: string, value?: string) => {
    return value ? (
      <tr className="bg-gray-50">
        <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
        <td className="p-2 text-gray-900 text-left">{value}</td>
      </tr>
    ) : null;
  };

  return (
    <div className="text-small-regular py-4">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {renderRow("Informazioni Prodotto", informazioniProdotto)}
        </tbody>
      </table>
    </div>
  );
};

const AccessoriTab = ({ accessori }: { accessori?: string }) => {
  const renderRow = (label: string, value?: string) => {
    return value ? (
      <tr className="bg-gray-50">
        <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
        <td className="p-2 text-gray-900 text-left">{value}</td>
      </tr>
    ) : null;
  };

  return (
    <div className="text-small-regular py-4">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {renderRow("Accessori", accessori)}
        </tbody>
      </table>
    </div>
  );
};

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick-up
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
