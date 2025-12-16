export default {
  async afterCreate(event) {
    try {
      const { result } = event;

      const name = result.name;
      const email = result.email;

      if (!email) return;

      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'We received your message — Unelma',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hello ${name || 'there'},</h2>
            <p>Thank you for contacting Unelma!</p>
            <p>Your message has been received and our team will reply shortly.</p>
            <br />
            <p>Best regards,<br/>Unelma Team</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("=== Strapi Email Error ===");
      console.error("Name:", err.name);
      console.error("Message:", err.message);
      if (err.details) {
        console.error("Details:", JSON.stringify(err.details, null, 2));
      }
      console.error("Full error object:", err);
    }
  },
};
