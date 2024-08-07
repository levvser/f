"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"

type ProductTabsProps = {
  productId: string
}

const ProductTabs = ({ productId }: ProductTabsProps) => {
  const [product, setProduct] = useState<PricedProduct | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://ac-k6jsi.ondigitalocean.app/store/products")
        const productData = response.data.products.find((p: PricedProduct) => p.id === productId)
        setProduct(productData)
      } catch (err) {
        setError("Failed to fetch product data.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

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

const ProductInfoTab = ({ product }: { product: PricedProduct }) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-"
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Title</span>
            <p>{product.title}</p>
          </div>
          <div>
            <span className="font-semibold">Subtitle</span>
            <p>{product.subtitle}</p>
          </div>
          <div>
            <span className="font-semibold">Description</span>
            <p>{product.description}</p>
          </div>
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Collection</span>
            <p>{product.collection ? product.collection.title : "-"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : "-"}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : "-"}
            </p>
          </div>
          <div>
            <span className="font-semibold">Created At</span>
            <p>{formatDate(product.created_at?.toString() || null)}</p>
          </div>
          <div>
            <span className="font-semibold">Updated At</span>
            <p>{formatDate(product.updated_at?.toString() || null)}</p>
          </div>
        </div>
      </div>
      {product.tags?.length ? (
        <div>
          <span className="font-semibold">Tags</span>
          <p>{product.tags.join(", ")}</p>
        </div>
      ) : null}
      {product.images?.length ? (
        <div className="mt-4">
          <span className="font-semibold">Images</span>
          <div className="flex gap-x-4">
            {product.images.map((image) => (
              <img key={image.id} src={image.url} alt={product.title} className="w-24 h-24 object-cover" />
            ))}
          </div>
        </div>
      ) : null}
      {product.options?.length ? (
        <div className="mt-4">
          <span className="font-semibold">Options</span>
          <ul>
            {product.options.map((option) => (
              <li key={option.id}>
                {option.title}: {option.values.map((value) => value.value).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {product.variants?.length ? (
        <div className="mt-4">
          <span className="font-semibold">Variants</span>
          <ul>
            {product.variants.map((variant) => (
              <li key={variant.id}>
                {variant.title} - {variant.inventory_quantity} in stock
              </li>
            ))}
          </ul>
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

export { ProductTabs, ProductInfoTab, ShippingInfoTab }
