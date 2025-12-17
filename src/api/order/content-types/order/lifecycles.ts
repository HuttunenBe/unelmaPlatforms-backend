export default {
  async afterCreate(event) {
    try {
      const { result } = event;

      const name = result.name;
      const email = result.email;
      const plan = result.plan || 'your subscription';
      const amount = result.amount || '';

      if (!email) return;

      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Payment Received — Unelma',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hi ${name || 'there'},</h2>
            <p>Thank you for your payment!</p>
            <p>We’ve successfully received your payment for <strong>${plan}</strong>${amount ? ` of <strong>$${amount}</strong>` : ''}.</p>
            <p>You now have full access to all features of Unelma!</p>
            <br />
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <br />
            <p>Cheers,<br/>The Unelma Team</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('Payment confirmation email error:', err);
    }
  },
};
