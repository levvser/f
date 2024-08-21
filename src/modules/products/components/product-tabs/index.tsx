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
  const getAttributeValue = (
    attrName: string,
    allowedValues: string[]
  ): string | undefined => {
    return product.custom_attributes
      ?.find((attr: CustomAttribute) => attr.name === attrName)
      ?.values.find((value) => allowedValues.includes(value.value))?.value;
  };

  const REGOLAZIONE_AMPIEZZA_PUNTO_VALUES = process.env.NEXT_PUBLIC_REGOLAZIONE_AMPIEZZA_PUNTO?.split(",") || [];
  const REGOLAZIONE_AMPIEZZA_PUNTO_ATTRIBUTE = getAttributeValue("REGOLAZIONE_AMPIEZZA_PUNTO", REGOLAZIONE_AMPIEZZA_PUNTO_VALUES);

  const REGOLAZIONE_LUNGHEZZA_PUNTO_VALUES = process.env.NEXT_PUBLIC_REGOLAZIONE_LUNGHEZZA_PUNTO?.split(",") || [];
  const REGOLAZIONE_LUNGHEZZA_PUNTO_ATTRIBUTE = getAttributeValue("REGOLAZIONE_LUNGHEZZA_PUNTO", REGOLAZIONE_LUNGHEZZA_PUNTO_VALUES);

  const AVVOLGI_BOBINA_AUTOMATICA_VALUES = process.env.NEXT_PUBLIC_AVVOLGI_BOBINA_AUTOMATICA?.split(",") || [];
  const AVVOLGI_BOBINA_AUTOMATICA_ATTRIBUTE = getAttributeValue("AVVOLGI_BOBINA_AUTOMATICA", AVVOLGI_BOBINA_AUTOMATICA_VALUES);

  const OCCHIELLATORE_AUTOMATICO_IN_1_FASE_VALUES = process.env.NEXT_PUBLIC_OCCHIELLATORE_AUTOMATICO_IN_1_FASE?.split(",") || [];
  const OCCHIELLATORE_AUTOMATICO_IN_1_FASE_ATTRIBUTE = getAttributeValue("OCCHIELLATORE_AUTOMATICO_IN_1_FASE", OCCHIELLATORE_AUTOMATICO_IN_1_FASE_VALUES);

  const ACCESSORI_INCLUSI_VALUES = process.env.NEXT_PUBLIC_ACCESSORI_INCLUSI?.split(",") || [];
  const ACCESSORI_INCLUSI_ATTRIBUTE = getAttributeValue("ACCESSORI_INCLUSI", ACCESSORI_INCLUSI_VALUES);

  const INFILA_AGO_AUTOMATICO_VALUES = process.env.NEXT_PUBLIC_INFILA_AGO_AUTOMATICO?.split(",") || [];
  const INFILA_AGO_AUTOMATICO_ATTRIBUTE = getAttributeValue("INFILA_AGO_AUTOMATICO", INFILA_AGO_AUTOMATICO_VALUES);

  const PIEDINI_A_SGANCIO_RAPIDO_VALUES = process.env.NEXT_PUBLIC_PIEDINI_A_SGANCIO_RAPIDO?.split(",") || [];
  const PIEDINI_A_SGANCIO_RAPIDO_ATTRIBUTE = getAttributeValue("PIEDINI_A_SGANCIO_RAPIDO", PIEDINI_A_SGANCIO_RAPIDO_VALUES);

  const PUNTI_ESSENZIALI_VALUES = process.env.NEXT_PUBLIC_PUNTI_ESSENZIALI?.split(",") || [];
  const PUNTI_ESSENZIALI_ATTRIBUTE = getAttributeValue("PUNTI_ESSENZIALI", PUNTI_ESSENZIALI_VALUES);

  const BRACCIO_LIBERO_VALUES = process.env.NEXT_PUBLIC_BRACCIO_LIBERO?.split(",") || [];
  const BRACCIO_LIBERO_ATTRIBUTE = getAttributeValue("BRACCIO_LIBERO", BRACCIO_LIBERO_VALUES);

  const OCCHIELLO_VALUES = process.env.NEXT_PUBLIC_OCCHIELLO?.split(",") || [];
  const OCCHIELLO_ATTRIBUTE = getAttributeValue("OCCHIELLO", OCCHIELLO_VALUES);

  const PUNTI_ELASTICI_VALUES = process.env.NEXT_PUBLIC_PUNTI_ELASTICI?.split(",") || [];
  const PUNTI_ELASTICI_ATTRIBUTE = getAttributeValue("PUNTI_ELASTICI", PUNTI_ELASTICI_VALUES);

  const PUNTI_DECORATIVI_VALUES = process.env.NEXT_PUBLIC_PUNTI_DECORATIVI?.split(",") || [];
  const PUNTI_DECORATIVI_ATTRIBUTE = getAttributeValue("PUNTI_DECORATIVI", PUNTI_DECORATIVI_VALUES);

  const PUNTI_UTILI_VALUES = process.env.NEXT_PUBLIC_PUNTI_UTILI?.split(",") || [];
  const PUNTI_UTILI_ATTRIBUTE = getAttributeValue("PUNTI_UTILI", PUNTI_UTILI_VALUES);

  const PUNTI_VALUES = process.env.NEXT_PUBLIC_PUNTI?.split(",") || [];
  const PUNTI_ATTRIBUTE = getAttributeValue("PUNTI", PUNTI_VALUES);

  const MODELLO_VALUES = process.env.NEXT_PUBLIC_MODELLO?.split(",") || [];
  const MODELLO_ATTRIBUTE = getAttributeValue("MODELLO", MODELLO_VALUES);

  const FACILE_SELEZIONE_PUNTI_VALUES = process.env.NEXT_PUBLIC_FACILE_SELEZIONE_PUNTI?.split(",") || [];
  const FACILE_SELEZIONE_PUNTI_ATTRIBUTE = getAttributeValue("FACILE_SELEZIONE_PUNTI", FACILE_SELEZIONE_PUNTI_VALUES);

  const MARCHE_VALUES = process.env.NEXT_PUBLIC_MARCHE?.split(",") || [];
  const MARCHE_ATTRIBUTE = getAttributeValue("MARCHE", MARCHE_VALUES);

  const TIPO_VALUES = process.env.NEXT_PUBLIC_TIPO?.split(",") || [];
  const TIPO_ATTRIBUTE = getAttributeValue("TIPO", TIPO_VALUES);

  const LIVELLO_VALUES = process.env.NEXT_PUBLIC_LIVELLO?.split(",") || [];
  const LIVELLO_ATTRIBUTE = getAttributeValue("LIVELLO", LIVELLO_VALUES);

  const CARATTERISTICHE_VALUES = process.env.NEXT_PUBLIC_CARATTERISTICHE?.split(",") || [];
  const CARATTERISTICHE_ATTRIBUTE = getAttributeValue("CARATTERISTICHE", CARATTERISTICHE_VALUES);

  const ACCESSORI_VALUES = process.env.NEXT_PUBLIC_ACCESSORI?.split(",") || [];
  const ACCESSORI_ATTRIBUTE = getAttributeValue("ACCESSORI", ACCESSORI_VALUES);

  const tabs = [
    {
      label: "Product Information",
      component: (
        <ProductInfoTab
          product={product}
          regolazioneAmpiezzaPunto={REGOLAZIONE_AMPIEZZA_PUNTO_ATTRIBUTE}
          regolazioneLunghezzaPunto={REGOLAZIONE_LUNGHEZZA_PUNTO_ATTRIBUTE}
          avvolgiBobinaAutomatica={AVVOLGI_BOBINA_AUTOMATICA_ATTRIBUTE}
          occhiellatoreAutomaticoIn1Fase={OCCHIELLATORE_AUTOMATICO_IN_1_FASE_ATTRIBUTE}
          accessoriInclusi={ACCESSORI_INCLUSI_ATTRIBUTE}
          infilaAgoAutomatico={INFILA_AGO_AUTOMATICO_ATTRIBUTE}
          piediniASgancioRapido={PIEDINI_A_SGANCIO_RAPIDO_ATTRIBUTE}
          puntiEssenziali={PUNTI_ESSENZIALI_ATTRIBUTE}
          braccioLibero={BRACCIO_LIBERO_ATTRIBUTE}
          occhiello={OCCHIELLO_ATTRIBUTE}
          puntiElastici={PUNTI_ELASTICI_ATTRIBUTE}
          puntiDecorativi={PUNTI_DECORATIVI_ATTRIBUTE}
          puntiUtili={PUNTI_UTILI_ATTRIBUTE}
          punti={PUNTI_ATTRIBUTE}
          modello={MODELLO_ATTRIBUTE}
          facileSelezionePunti={FACILE_SELEZIONE_PUNTI_ATTRIBUTE}
          marche={MARCHE_ATTRIBUTE}
          tipo={TIPO_ATTRIBUTE}
          livello={LIVELLO_ATTRIBUTE}
          caratteristiche={CARATTERISTICHE_ATTRIBUTE}
        />
      ),
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
  );
};

const ProductInfoTab = ({
  product,
  regolazioneAmpiezzaPunto,
  regolazioneLunghezzaPunto,
  avvolgiBobinaAutomatica,
  occhiellatoreAutomaticoIn1Fase,
  accessoriInclusi,
  infilaAgoAutomatico,
  piediniASgancioRapido,
  puntiEssenziali,
  braccioLibero,
  occhiello,
  puntiElastici,
  puntiDecorativi,
  puntiUtili,
  punti,
  modello,
  facileSelezionePunti,
  marche,
  tipo,
  livello,
  caratteristiche,
}: {
  product: CustomPricedProduct;
  regolazioneAmpiezzaPunto?: string;
  regolazioneLunghezzaPunto?: string;
  avvolgiBobinaAutomatica?: string;
  occhiellatoreAutomaticoIn1Fase?: string;
  accessoriInclusi?: string;
  infilaAgoAutomatico?: string;
  piediniASgancioRapido?: string;
  puntiEssenziali?: string;
  braccioLibero?: string;
  occhiello?: string;
  puntiElastici?: string;
  puntiDecorativi?: string;
  puntiUtili?: string;
  punti?: string;
  modello?: string;
  facileSelezionePunti?: string;
  marche?: string;
  tipo?: string;
  livello?: string;
  caratteristiche?: string;
}) => {
  let isOdd = true; // Start with `true` for the first row

  const renderRow = (label: string, value?: string) => {
    if (value) {
      const row = (
        <tr className={isOdd ? "bg-gray-50" : "bg-white"}>
          <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
          <td className="p-2 text-gray-900 text-left">{value}</td>
        </tr>
      );
      isOdd = !isOdd; // Toggle `isOdd` after each rendered row
      return row;
    }
    return null;
  };

  const rows = [
    renderRow("Regolazione Ampiezza Punto", regolazioneAmpiezzaPunto),
    renderRow("Regolazione Lunghezza Punto", regolazioneLunghezzaPunto),
    renderRow("Avvolgi Bobina Automatica", avvolgiBobinaAutomatica),
    renderRow("Occhiellatore Automatico in 1 Fase", occhiellatoreAutomaticoIn1Fase),
    renderRow("Accessori Inclusi", accessoriInclusi),
    renderRow("Infila Ago Automatico", infilaAgoAutomatico),
    renderRow("Piedini a Sgancio Rapido", piediniASgancioRapido),
    renderRow("Punti Essenziali", puntiEssenziali),
    renderRow("Braccio Libero", braccioLibero),
    renderRow("Occhiello", occhiello),
    renderRow("Punti Elastici", puntiElastici),
    renderRow("Punti Decorativi", puntiDecorativi),
    renderRow("Punti Utili", puntiUtili),
    renderRow("Punti", punti),
    renderRow("Modello", modello),
    renderRow("Facile Selezione Punti", facileSelezionePunti),
    renderRow("Marca", marche),
    renderRow("Tipo", tipo),
    renderRow("Livello", livello),
    renderRow("Caratteristiche", caratteristiche),
    renderRow("Peso", product.weight ? `${product.weight} g` : undefined),
    renderRow(
      "Dimensioni",
      product.length && product.width && product.height
        ? `${product.length}L x ${product.width}W x ${product.height}H`
        : undefined
    ),
    product.tags?.length ? (
      <tr className={isOdd ? "bg-gray-50" : "bg-white"}>
        <td className="font-medium p-2 text-gray-700 text-left">Tags</td>
        <td className="p-2 text-gray-900 text-left">{product.tags.join(", ")}</td>
      </tr>
    ) : null,
  ];

  return (
    <div className="text-small-regular py-4">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {rows.map((row, index) => (row ? <React.Fragment key={index}>{row}</React.Fragment> : null))}
        </tbody>
      </table>
    </div>
  );
};

const AccessoriTab = ({ accessori }: { accessori?: string }) => {
  const renderRow = (label: string, value?: string) => {
    return value ? (
      <tr className="bg-gray-50">
        <td className="font-medium p-2 text-gray-700 text-left">{label}</td>
        <td className="p-2 text-gray-900 text-left">{value}</td>
      </tr>
    ) : null;
  };

  return (
    <div className="text-small-regular py-4">
      <table className="w-full table-auto border-collapse">
        <tbody>
          {renderRow("Accessori", accessori)}
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
  );
};

export default ProductTabs;
