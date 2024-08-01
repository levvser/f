import { Text } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region } from "@medusajs/medusa";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product);

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  return (
    <div className="bg-white border border-[color:#F8F8FF] overflow-hidden transition-transform duration-300">
      <LocalizedClientLink
        href={`/products/${productPreview.handle}`}
        className="group block"
      >
        <div className="relative w-full pt-[100%] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full transform scale-105 transition-transform duration-500 ease-in-out group-hover:scale-110">
            <Thumbnail
              thumbnail={productPreview.thumbnail}
              size="full"
              isFeatured={isFeatured}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="p-4">
          <Text
            className="text-xl font-semibold text-gray-800 transition-colors duration-500 ease-in-out bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-gray-700 group-hover:via-gray-800 group-hover:to-purple-800"
            data-testid="product-title"
          >
            {productPreview.title}
          </Text>
          <p
            className="mt-1 text-sm text-gray-600"
            data-testid="product-marca"
          >
            Marca
          </p>
          <div className="flex items-baseline justify-between mt-4">
            {cheapestPrice && (
              <>
                <span className="inline-block bg-blue-100 bg-opacity-30 backdrop-filter backdrop-blur-lg text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded shadow-sm">
                  Principiante
                </span>
                <PreviewPrice
                  price={cheapestPrice}
                  className="text-xl font-semibold text-gray-900 ml-auto"
                />
              </>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  );
}
