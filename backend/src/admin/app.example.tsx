import { StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: [
      'ru',
      'en',
    ],
  },
  bootstrap(app: StrapiApp) {
    console.log('Admin Loaded');
  },
};