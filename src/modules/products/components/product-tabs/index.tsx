"use client";

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import Back from "@modules/common/icons/back";
import FastDelivery from "@modules/common/icons/fast-delivery";
import Refresh from "@modules/common/icons/refresh";
import Accordion from "./accordion";
import React from "react";

// Define a CustomAttribute type
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
		value: string;
		metadata: any;
		rank: number;
	}[];
};

// Define a CustomPricedProduct type that extends PricedProduct
type CustomPricedProduct = PricedProduct & {
	custom_attributes?: CustomAttribute[];
	material?: {
		CARATTERISTICHE: Record<string, string>;
		SPECIFICHE: Record<string, string>;
		ACCESSORI_INCLUSI: string[];
	} | string | null;
};

// Define the props for the ProductTabs component
type ProductTabsProps = {
	product: CustomPricedProduct;
};

// Replace this with your actual value
const NEXT_PUBLIC_MARCHE_VALUES = "Your NEXT_PUBLIC_MARCHE_VALUES here";

// Main ProductTabs component
const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
	// Helper function to get attribute values by name
	const getAttributeValues = (attrName: string): string[] => {
		return product.custom_attributes
			?.find((attr: CustomAttribute) => attr.name === attrName)
			?.values.map((value) => value.value) || [];
	};

	// Ensure that material is an object and not null or string
	const material = typeof product.material === "object" && product.material !== null
		? product.material
		: {
			CARATTERISTICHE: {},
			SPECIFICHE: {},
			ACCESSORI_INCLUSI: [],
		};

	// Define the tabs to be displayed
	const tabs = [
		{
			label: "Caratteristiche",
			component: <CaratteristicheTab caratteristiche={material.CARATTERISTICHE} />,
		},
		{
			label: "Specifiche",
			component: <SpecificheTab specifiche={material.SPECIFICHE} />,
		},
		{
			label: "Accessori Inclusi",
			component: <AccessoriTab accessori={material.ACCESSORI_INCLUSI} />,
		},
		{
			label: "Spedizioni & resi",
			component: <ShippingInfoTab />,
		},
	];

	// Render the Accordion with the tabs
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

// CaratteristicheTab component to display product features
const CaratteristicheTab: React.FC<{ caratteristiche?: Record<string, string> }> = ({ caratteristiche }) => {
	let isOdd = true;

	const renderRow = (label: string, value: string) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={label}>
				<td className="font-medium p-2 text-gray-700 text-left">{label}</td>
				<td className="p-2 text-gray-900 text-left">{value}</td>
			</tr>
		);
		isOdd = !isOdd;
		return row;
	};

	const rows = caratteristiche
		? Object.entries(caratteristiche).map(([label, value]) => renderRow(label, value))
		: null;

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

// SpecificheTab component to display product specifications
const SpecificheTab: React.FC<{ specifiche?: Record<string, string> }> = ({ specifiche }) => {
	let isOdd = true;

	const renderRow = (label: string, value: string) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={label}>
				<td className="font-medium p-2 text-gray-700 text-left">{label}</td>
				<td className="p-2 text-gray-900 text-left">{value}</td>
			</tr>
		);
		isOdd = !isOdd;
		return row;
	};

	const rows = specifiche
		? Object.entries(specifiche).map(([label, value]) => renderRow(label, value))
		: null;

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

// AccessoriTab component to display included accessories
const AccessoriTab: React.FC<{ accessori?: string[] }> = ({ accessori }) => {
	let isOdd = true;

	const renderRow = (item: string, index: number) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={index}>
				<td className="p-2 text-gray-900 text-left">{item}</td>
			</tr>
		);
		isOdd = !isOdd;
		return row;
	};

	const rows = accessori ? accessori.map((item, index) => renderRow(item, index)) : null;

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

// ShippingInfoTab component to display shipping and return information
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

// Export the main ProductTabs component
export default ProductTabs;
