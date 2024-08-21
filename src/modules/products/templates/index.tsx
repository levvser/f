import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { useState, Suspense } from "react"

import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)

  if (!product || !product.id) {
    return notFound()
  }

  const openModal = (image: string) => {
    setCurrentImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentImage(null)
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Image Gallery on the Left */}
        <div className="w-full small:w-2/5 small:pr-6">
          <div className="grid grid-cols-2 gap-2">
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Product Image ${index + 1}`}
                className="cursor-pointer"
                onClick={() => openModal(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Info and Actions on the Right */}
        <div className="w-full small:w-3/5 flex flex-col gap-y-8">
          <ProductInfo product={product} />
          <ProductTabs product={product} />
          <ProductOnboardingCta />
          <Suspense
            fallback={
              <ProductActions
                disabled={true}
                product={product}
                region={region}
              />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <img src={currentImage} alt="Full screen" className="max-w-full max-h-full" />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-xl bg-gray-800 bg-opacity-75 rounded-full p-2"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductTemplate
