import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense, useRef, useState } from "react"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"
import styles from './ProductTemplate.module.css'

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
  if (!product || !product.id) {
    return notFound()
  }

  const [isZoomed, setIsZoomed] = useState(false)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (isZoomed && imgRef.current) {
      const img = imgRef.current
      const rect = img.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      img.style.transformOrigin = `${x}% ${y}%`
    }
  }

  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  return (
    <>
      <div
        className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Image Gallery on the Left */}
        <div className="w-full small:w-2/5 small:pr-6">
          <div className="flex flex-col gap-y-4">
            {product.images?.map((image, index) => (
              <div key={index} className={styles['zoom-container']}>
                <img
                  ref={imgRef}
                  src={image.url}
                  alt={product.title}
                  className={`w-full h-auto ${isZoomed ? 'zoomed' : ''}`}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ transform: isZoomed ? 'scale(1.5)' : 'scale(1)' }}
                />
              </div>
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
    </>
  )
}

export default ProductTemplate
