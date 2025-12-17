export default {
  async afterCreate(event) {
    try {
      const { result } = event;

      const email = result.customerEmail;
      if (!email) return;

      const amount = result.amountTotal ? `${result.amountTotal} ${result.currency}` : '';
      const status = result.orderStatus || 'paid';
      const items = result.items || [];
      const products = result.products || [];

      // Create a list of purchased products/items
      const itemsList = items.length
        ? items.map((i: any, idx: number) => `<li>${i.name || `Item ${idx + 1}`}</li>`).join('')
        : products.length
        ? products.map((p: any) => `<li>${p.name}</li>`).join('')
        : '<li>Your order</li>';

      await strapi.plugins['email'].services.email.send({
        to: email,
        subject: 'Payment Received — Unelma',
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Hi there,</h2>
            <p>Thank you for your payment!</p>
            <p>Your payment has been <strong>${status}</strong> ${amount ? `for <strong>${amount}</strong>` : ''}.</p>
            <p>Order details:</p>
            <ul>
              ${itemsList}
            </ul>
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
