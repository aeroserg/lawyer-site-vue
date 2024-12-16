import type { Schema, Struct } from '@strapi/strapi';

export interface CaseCardKartochkaKejsa extends Struct.ComponentSchema {
  collectionName: 'components_case_card_kartochka_kejsa';
  info: {
    displayName: '\u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043A\u0435\u0439\u0441\u0430';
  };
  attributes: {
    article_title: Schema.Attribute.String;
    case_description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    case_number: Schema.Attribute.String;
  };
}

export interface PriceListCardKartochkaPrajsLista
  extends Struct.ComponentSchema {
  collectionName: 'components_price_list_card_kartochka_prajs_lista';
  info: {
    description: '';
    displayName: '\u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0442\u0438\u043F\u0430 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442\u0430';
  };
  attributes: {
    service_price_card: Schema.Attribute.Component<
      'service-price-card.kartochka-prajs-lista',
      true
    >;
    service_type: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ServiceCardKartochkaUslugi extends Struct.ComponentSchema {
  collectionName: 'components_service_card_kartochka_uslugi';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0443\u0441\u043B\u0443\u0433\u0438';
  };
  attributes: {
    brief_description: Schema.Attribute.Text;
    full_description: Schema.Attribute.Text;
    service_photo: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface ServicePriceCardKartochkaPrajsLista
  extends Struct.ComponentSchema {
  collectionName: 'components_service_price_card_kartochka_prajs_lista';
  info: {
    description: '';
    displayName: '\u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E\u0439 \u0443\u0441\u043B\u0443\u0433\u0438 \u043F\u0440\u0430\u0439\u0441-\u043B\u0438\u0441\u0442\u0430';
  };
  attributes: {
    service_card_details: Schema.Attribute.Blocks;
    service_card_inscription: Schema.Attribute.Text;
    service_card_price: Schema.Attribute.String;
    service_title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'case-card.kartochka-kejsa': CaseCardKartochkaKejsa;
      'price-list-card.kartochka-prajs-lista': PriceListCardKartochkaPrajsLista;
      'service-card.kartochka-uslugi': ServiceCardKartochkaUslugi;
      'service-price-card.kartochka-prajs-lista': ServicePriceCardKartochkaPrajsLista;
    }
  }
}
