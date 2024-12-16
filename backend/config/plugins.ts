export default () => ({
  documentation: {
    config: {
      info: {
        title: 'Your API Documentation',
        description: 'API documentation for your Strapi application',
        version: '1.0.0',
      },
      outputFile: './docs',
      format: 'json',
    },
  },
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 1000000,
      },
    },
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.yandex.ru',
        port: 465,
        auth: {
          user: 'B1308267@yandex.ru',
          pass: 'mkgqcwxcyedgpvvy',
        },
      },
      settings: {
        defaultFrom: 'CopyDef B1308267@yandex.ru',
        defaultReplyTo: 'B1308267@yandex.ru',
      },
    },
  },
});
