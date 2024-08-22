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

const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
	const getAttributeValues = (attrName: string): string[] => {
		return product.custom_attributes
			?.find((attr: CustomAttribute) => attr.name === attrName)
			?.values.map((value) => value.value) || [];
	};

	// Fetching the product information attributes and accessori in the same way
	const INFORMAZIONI_PRODOTTO_ATTRIBUTES = getAttributeValues("INFORMAZIONI_PRODOTTO");
	const ACCESSORI_ATTRIBUTE = getAttributeValues("ACCESSORI");

	const tabs = [
		{
			label: "Product Information",
			component: <ProductInfoTab informazioniProdottoAttributes={INFORMAZIONI_PRODOTTO_ATTRIBUTES} />,
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
					<Accordion.Item key={i} title={tab.label} headingSize="medium" value={tab.label}>
						{tab.component}
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
};

const ProductInfoTab: React.FC<{ informazioniProdottoAttributes: string[] }> = ({
	informazioniProdottoAttributes,
}) => {
	let isOdd = true; // Start with `true` for the first row

	const renderRow = (label: string, value: string) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={label}>
				<td className="font-medium p-2 text-gray-700 text-left">{label}</td>
				<td className="p-2 text-gray-900 text-left">{value}</td>
			</tr>
		);
		isOdd = !isOdd; // Toggle `isOdd` after each rendered row
		return row;
	};

	const rows = informazioniProdottoAttributes.map((attribute) => {
		const [label, value] = attribute.split("//");
		return renderRow(label, value);
	});

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

const AccessoriTab: React.FC<{ accessori?: string[] }> = ({ accessori }) => {
	let isOdd = true; // Start with `true` for the first row

	const renderRow = (label: string, value: string) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={label}>
				<td className="font-medium p-2 text-gray-700 text-left">{label}</td>
				<td className="p-2 text-gray-900 text-left">{value}</td>
			</tr>
		);
		isOdd = !isOdd; // Toggle `isOdd` after each rendered row
		return row;
	};

	const rows = accessori?.map((attribute) => {
		const [label, value] = attribute.split("//");
		return renderRow(label, value);
	});

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
						Il pacchetto arriverà entro 3-5 giorni lavorativi presso il luogo di ritiro o nel comfort di
						la tua casa.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-x-2">
					<Refresh />
					<div>
						<span className="font-semibold">Scambi semplici</span>
						<p className="max-w-sm">
							La misura non è del tutto corretta? Nessun problema - we&apos;Scambierò il tuo prodotto con uno nuovo.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-x-2">
					<Back />
					<div>
						<span className="font-semibold">Resi facili</span>
						<p className="max-w-sm">
							Restituisci il tuo prodotto e we&apos;Ti rimborserò i tuoi soldi. Nessuna domanda – we&apos;Lo farò
							il nostro meglio per assicurarti che il tuo ritorno sia senza problemi.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductTabs;
