export default ({ env }) => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: ['name', 'country'],
      },
    },
  },

  email: {
    config: {
      provider: 'nodemailer', // Must match installed package
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.gmail.com'),
        port: Number(env('SMTP_PORT', 587)),
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
        secure: false, // true if using port 465
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'Unelma Test <devjaywilco@gmail.com>'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'devjaywilco@gmail.com'),
      },
    },
  },
});
