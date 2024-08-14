"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import Accordion from "./accordion"

type CustomAttribute = {
  id: string
  created_at: string
  updated_at: string
  name: string
  description: string
  type: string
  handle: string
  filterable: boolean | null
  metadata: any
  values: {
    id: string
    created_at: string
    updated_at: string
    value: string
    metadata: any
    rank: number
  }[]
}

type CustomPricedProduct = PricedProduct & {
  custom_attributes?: CustomAttribute[]
}

type ProductTabsProps = {
  product: CustomPricedProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const getAttributeValue = (
    attrName: string,
    allowedValues: string[]
  ): string | undefined => {
    return product.custom_attributes
      ?.find((attr: CustomAttribute) => attr.name === attrName)
      ?.values.find((value) => allowedValues.includes(value.value))?.value;
  };

  // Accessing environment variables
  const marcheValues = process.env.NEXT_PUBLIC_MARCHE_VALUES?.split(",") || [];
  const marche_attribute = getAttributeValue("MARCHE", marcheValues);

  const tipoValues = process.env.NEXT_PUBLIC_TIPO_VALUES?.split(",") || [];
  const tipo_attribute = getAttributeValue("TIPO", tipoValues);

  const livelloValues = process.env.NEXT_PUBLIC_LIVELLO_VALUES?.split(",") || [];
  const livello_attribute = getAttributeValue("LIVELLO", livelloValues);

  const caratteristicheValues = process.env.NEXT_PUBLIC_CARATTERISTICHE_VALUES?.split(",") || [];
  const caratteristiche_attribute = getAttributeValue("CARATTERISTICHE", caratteristicheValues);

  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab 
                    product={product} 
                    marche={marche_attribute}
                    tipo={tipo_attribute}
                    livello={livello_attribute}
                    caratteristiche={caratteristiche_attribute}
                 />,
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
  )
}

const ProductInfoTab = ({ product, marche, tipo, livello, caratteristiche }: {
  product: CustomPricedProduct,
  marche?: string,
  tipo?: string,
  livello?: string,
  caratteristiche?: string,
}) => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Caratteristiche</span>
            <p>{caratteristiche || "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Livello</span>
            <p>{livello || "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Marca</span>
            <p>{marche || "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Tipo</span>
            <p>{tipo || "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Peso</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensioni</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">Tags</span>
          <p>{product.tags.join(", ")}</p>
        </div>
      ) : null}
    </div>
  )
}

const ShippingInfoTab = () => {
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
  )
}

export default ProductTabs
