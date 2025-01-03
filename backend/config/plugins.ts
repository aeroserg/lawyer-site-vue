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
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'copydef@copydef.ru',
          pass: process.env.EMAIL_PASSWORD,
        },
        connectionTimeout: 10000,  
      },
      settings: {
        defaultFrom: 'Новая заявка с сайта copydef@copydef.ru',
        defaultReplyTo: 'copydef@copydef.ru',
      },
    },
  },
});
