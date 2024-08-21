"use client"; // Ensure this is a Client Component

import { Region } from "@medusajs/medusa";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import React, { useState, Suspense } from "react";

import ProductActions from "@modules/products/components/product-actions";
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta";
import ProductTabs from "@modules/products/components/product-tabs";
import RelatedProducts from "@modules/products/components/related-products";
import ProductInfo from "@modules/products/templates/product-info";
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products";
import { notFound } from "next/navigation";
import ProductActionsWrapper from "./product-actions-wrapper";
import styles from './ProductTemplate.module.css';

type ProductTemplateProps = {
  product: PricedProduct;
  region: Region;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  if (!product || !product.id) {
    return notFound();
  }

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className={styles.container}>
      <div
        className="flex flex-col small:flex-row small:items-start py-6 relative"
        data-testid="product-container"
      >
        {/* Image Gallery on the Left */}
        <div className="w-full small:w-3/5 small:pr-6">
          <div className={styles['image-gallery-container']}>
            {product.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Product Image ${index + 1}`}
                onClick={() => openModal(image.url)}
              />
            ))}
          </div>
        </div>

        {/* Product Info and Actions on the Right */}
        <div className={`w-full small:w-2/5 flex flex-col gap-y-8 ${styles['product-info']}`}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <ProductTabs product={product} />
          <div className={styles['product-actions']}>
            <button className={styles['add-to-cart-btn']}>Add to Cart</button>
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
      </div>

      <div
        className={styles['related-products-container']}
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>

      {/* Full-Screen Image Modal */}
      {isModalOpen && currentImage && (
        <div className={styles.modal}>
          <img src={currentImage} alt="Full screen" />
          <button onClick={closeModal} className={styles['close-modal-btn']}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductTemplate;
