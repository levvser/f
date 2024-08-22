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

const ProductInfoTab = ({
	informazioniProdottoAttributes,
}: {
	informazioniProdottoAttributes: string[];
}) => {
	let isOdd = true; // Start with `true` for the first row

	const renderRow = (value: string) => {
		const row = (
			<tr className={isOdd ? "bg-gray-50" : "bg-white"} key={value}>
				<td className="p-2 text-gray-900 text-left col-span-2">{value}</td>
			</tr>
		);
		isOdd = !isOdd; // Toggle `isOdd` after each rendered row
		return row;
	};

	const rows = informazioniProdottoAttributes.map((value) => renderRow(value));

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>{rows.map((row, index) => row && <React.Fragment key={index}>{row}</React.Fragment>)}</tbody>
			</table>
		</div>
	);
};

const AccessoriTab = ({ accessori }: { accessori?: string[] }) => {
	let isOdd = true; // Start with `true` for the first row

	return (
		<div className="text-small-regular py-4">
			<table className="w-full table-auto border-collapse">
				<tbody>
					{accessori?.map((item, index) => {
						const row = (
							<tr key={index} className={isOdd ? "bg-gray-50" : "bg-white"}>
								<td className="p-2 text-gray-900 text-left col-span-2">{item}</td>
							</tr>
						);
						isOdd = !isOdd; // Toggle `isOdd` after each rendered row
						return row;
					})}
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
							Your package will arrive in 3-5 business days at your pick-up location or in the comfort of
							your home.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-x-2">
					<Refresh />
					<div>
						<span className="font-semibold">Simple exchanges</span>
						<p className="max-w-sm">
							Is the fit not quite right? No worries - we&apos;ll exchange your product for a new one.
						</p>
					</div>
				</div>
				<div className="flex items-start gap-x-2">
					<Back />
					<div>
						<span className="font-semibold">Easy returns</span>
						<p className="max-w-sm">
							Just return your product and we&apos;ll refund your money. No questions asked – we&apos;ll do
							our best to make sure your return is hassle-free.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductTabs;
