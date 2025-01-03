import { Plugin, StrapiApp } from "@strapi/strapi/admin";

export default {
  config: {
    locales: [
      'ru',
      'en',
    ],
  },
  bootstrap(app: StrapiApp) {
    const emailConfig = strapi.config.get('plugin.email');
    strapi.log.info('Email plugin configuration:');
    strapi.log.info(JSON.stringify(emailConfig, null, 2));
    console.log('Admin Loaded');
  },
};