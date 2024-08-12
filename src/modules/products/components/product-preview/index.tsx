import { Text } from "@medusajs/ui";
import { ProductPreviewType } from "types/global";
import { retrievePricedProductById } from "@lib/data";
import { getProductPrice } from "@lib/util/get-product-price";
import { Region} from "@medusajs/medusa"; // Assuming correct import
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Thumbnail from "../thumbnail";
import PreviewPrice from "./price";

type CustomAttributeValue = {
  id: string;
  created_at: string;
  updated_at: string;
  value: string;
  metadata: any;
  rank: number;
};

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
  values: CustomAttributeValue[];
};

// Extend PricedProduct with custom attributes
type CustomPricedProduct = PricedProduct & {
  custom_attributes?: CustomAttribute[];
};

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
}) {
  const pricedProduct = (await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  })) as CustomPricedProduct | null;

  if (!pricedProduct) {
    return null;
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  const getAttributeValue = (
    attrName: string,
    allowedValues: string[]
  ): string | undefined => {
    return pricedProduct.custom_attributes
      ?.find((attr: CustomAttribute) => attr.name === attrName)
      ?.values.find((value: CustomAttributeValue) => allowedValues.includes(value.value))?.value;
  };

  const livelloValues = ["PRINCIPIANTE", "INTERMEDIO", "ESPERTO"];
  const livello_attribute = getAttributeValue("LIVELLO", livelloValues);

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
                  {livello_attribute || "N/A"}
                </span>
                <PreviewPrice price={cheapestPrice} />
              </>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  );
}
