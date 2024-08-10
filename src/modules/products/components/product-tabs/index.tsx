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
  const tabs = [
    {
      label: "Product Information",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Shipping & Returns",
      component: <ShippingInfoTab />,
    },
  ]

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


const ProductInfoTab = ({ product }: { product: CustomPricedProduct }) => {
  const marcheValues = ["ALTRO", "JUKI", "EFFECI", "VALUE2", "VALUE3", "VALUE4", "VALUE5", "VALUE6", "VALUE7", "VALUE8", "VALUE9", "VALUE10"];
  const marche_attribute = product.custom_attributes?.find(
    (attr) => attr.name === "MARCHE"
  )?.values.find(value => marcheValues.includes(value.value));


  const tipoValues = ["COPERTURA", "VALUE11", "VALUE12", "VALUE13", "VALUE14", "VALUE15", "VALUE16", "VALUE17", "VALUE18", "VALUE19", "VALUE20"];
  const tipo_attribute = product.custom_attributes?.find(
    (attr) => attr.name === "TIPO"
  )?.values.find(value => tipoValues.includes(value.value));

  const livelloValues = ["PRINCIPIANTE", "INTERMEDIO", "ESPERTO"];
  const livello_attribute = product.custom_attributes?.find(
    (attr) => attr.name === "LIVELLO"
  )?.values.find(value => tipoValues.includes(value.value));

  const descrizioneValues = [
    "PRINCIPIANTE",
    "INTERMEDIO",
    "ESPERTO"
  ];
  const descrizione_attribute = product.custom_attributes?.find(
    (attr) => attr.name === "DESCRIZIONE"
  )?.values.find(value => tipoValues.includes(value.value));



  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
          <span className="font-semibold">Descrizione</span>
          <p>{descrizione_attribute ? descrizione_attribute.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Livello</span>
            <p>{livello_attribute ? livello_attribute.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Marca</span>
            <p>{marche_attribute ? marche_attribute.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Tipo</span>
            <p>{tipo_attribute ? tipo_attribute.value : "-"}</p>
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
