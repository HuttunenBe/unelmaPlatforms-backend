function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async ({ strapi }: { strapi: any }) => {
  console.log('🌱 Starting Product database seeding (safe mode)...');

  const productCategoriesData = [
    'Accessories',
    'Open source',
    'Shopping',
    'Enterprise Software',
  ].map(name => ({
    name,
    slug: slugify(name),
  }));

  const productCategories: any[] = [];
  for (const cat of productCategoriesData) {
    const existing = await strapi.db
      .query('api::product-category.product-category')
      .findOne({ where: { slug: cat.slug } });
    const ensured = existing
      ? existing
      : await strapi.entityService.create('api::product-category.product-category', {
          data: cat,
        });
    productCategories.push(ensured);
  }
  console.log('✅ Product categories ensured.');

  const productsData = [
    {
      title: 'Open-source software',
      slug: 'open-source-software',
      shortDescription:
        'Unelma Platforms brings to you UnelmaBrowser and Unelma-Code Translator - innovative software designed for optimised user experience. With open-source access, full support, maintenance, security provisions, and bug fixes, we ensure a smooth, secure and efficient digital journey.',
      description: `Empower your digital journey with Unelma Platforms' cutting-edge innovations - UnelmaBrowser and Unelma-Code Translator!

UnelmaBrowser is not just a browser but a powerful tool that ensures a fast, reliable, and secure browsing experience. With its user-friendly interface and tailored features, exploring the web has never been more effortless and enjoyable!

But we didn't stop at browsing. Our Unelma-Code Translator is an open-source software designed to make your work easier. Whether it's simplifying complex codes or translating code languages, Unelma-Code Translator elevates the seamless coding experience to a whole new level.

What's more? We understand the significance of continuous support, maintenance, and security in the rapidly evolving digital landscape. That's why we provide comprehensive support, periodic maintenance, and regular security updates ensuring the smooth operation and longevity of our products.

Facing technical glitches? Our professional team is right there to provide prompt bug fixes, ensuring minimal disruption.

So why wait? Embark on your digital revolution with UnelmaBrowser and Unelma-Code Translator. Join the Unelma Platforms family and experience a superior digital journey like never before!

UnelmaBrowser, an open-source software is freely available for macOS, windows and linux from here: https://github.com/unelmacoin/unelma-browser/releases

Unelma-Code Translator, is also freely available from here: https://github.com/unelmacoin/unelma-code-translate/releases`,
      price: 0,
      rating: 5,
      SKU: '123456_UnelmaPlatforms_OpenSource',
      tag: 'New',
      product_category: productCategories.find(c => c.name === 'Open source')?.id,
      additionalInfo: 'Additional info will be added later.',
    },
    {
      title: 'UnelmaMail',
      slug: 'unelma-mail',
      shortDescription:
        'Explore UnelmaMail, the world\'s first AI-powered email marketing platform developed by Unelma Platforms. Offering user-friendly and efficient solutions, UnelmaMail revolutionizes the way businesses engage in email marketing strategies for ultimate growth and expansion. Experience the future of email marketing with UnelmaMail.',
      description: `Unleash the full potential of your email marketing with UnelmaMail! Harness the power of AI to secure the edge your business needs in today's competitive marketing landscape. Our platform is packed with advanced features, user-friendly design, and unprecedented efficiencies to support your unique business needs.

But that's not all! We understand that adopting a new platform can come with its additional challenges, which is why we offer a comprehensive two-year support package with every purchase. You'll have full access to maintenance, security updates, and bug fixes - ensuring UnelmaMail operates seamlessly with your business.

What if you have issues that need immediate redress? We've got you covered. The cost of one to two developers is included in the package to provide real-time solutions to any issues you may have. No more worrying about hidden fees or charges.

With UnelmaMail, you receive not just a product but a reliable partnership. Make the smart choice for your email marketing strategy; choose UnelmaMail. Revolutionize the way you engage with your clients today.`,
      price: 49.675,
      rating: 5,
      SKU: '123456_UnelmaMail',
      tag: 'Popular',
      product_category: productCategories.find(c => c.name === 'Enterprise Software')?.id,
      additionalInfo: 'Additional info will be added later.',
    },
    {
      title: 'UnelmaCRM',
      slug: 'unelma-crm',
      shortDescription:
        'When you choose UnelmaCRM, you choose a comprehensive CRM solution that offers 1 year of full support, maintenance, hosting, SaaS, top-notch security, and bug fixes.',
      description: `Introducing UnelmaCRM - your ultimate customer relationship management solution! With UnelmaCRM, we offer more than just a CRM system; we provide a comprehensive package that includes 1 year of full support, maintenance, hosting, SaaS (Software as a Service), top-notch security, and bug fixes.

Our goal is to empower your business with the tools and resources necessary to enhance customer relationships and improve overall efficiency. With UnelmaCRM, you can streamline your sales processes, optimize lead management, and nurture long-lasting customer engagements.

But that's not all. We believe in providing a seamless experience for our customers, which is why we take care of all hosting responsibilities. Say goodbye to the hassle of managing servers or worrying about downtime. With UnelmaCRM, your system will be hosted on our secure and reliable infrastructure, allowing you to focus on what matters most - growing your business.

We understand the importance of data security in today's digital landscape. That's why we prioritize the protection of your valuable information. UnelmaCRM implements robust security measures to safeguard your data from unauthorized access. You can trust us to keep your business and customer data secure, giving you peace of mind.

Additionally, software bugs can be frustrating and detrimental to your operations. With UnelmaCRM, our team of experts is dedicated to addressing any issues promptly. We provide regular bug fixes to ensure your CRM system runs smoothly and flawlessly.

When you choose UnelmaCRM, you choose a comprehensive CRM solution that offers 1 year of full support, maintenance, hosting, SaaS, top-notch security, and bug fixes.`,
      price: 10.95,
      rating: 5,
      SKU: '123456_UnelmaCRM',
      tag: 'Popular',
      product_category: productCategories.find(c => c.name === 'Enterprise Software')?.id,
      additionalInfo: 'Additional info will be added later.',
    },
    {
      title: 'UnelmaCloud',
      slug: 'unelma-cloud',
      shortDescription:
        'With UnelmaCloud, we offer more than just storage space. Our product comes with a comprehensive package that includes one year of full support, maintenance, and security, along with free bug fixes from our experienced team of developers.',
      description: `Are you tired of dealing with the complexities and limitations of traditional cloud storage services? Look no further than UnelmaCloud, the ultimate solution for all your cloud storage needs.

With UnelmaCloud, we offer more than just storage space. Our product comes with a comprehensive package that includes one year of full support, maintenance, and security, along with free bug fixes from our experienced team of developers.

Imagine having a dedicated developer at your disposal, ensuring that your cloud storage remains optimized, secure, and bug-free. Our team will work tirelessly to address any issues that may arise, providing you with peace of mind and the assurance that your data is in capable hands.

But that's not all. UnelmaCloud offers much more than just exceptional support. Our platform boasts an intuitive user interface, making it effortless to manage and organize your files. Whether you need to access important documents, share files with colleagues, or collaborate on projects, UnelmaCloud provides a seamless and efficient experience.

Moreover, our advanced security measures guarantee the utmost protection for your data. We employ the latest encryption protocols to safeguard your information, ensuring that it remains confidential and inaccessible to unauthorized parties.

By choosing UnelmaCloud, you not only invest in a robust cloud storage solution but also gain a trusted partner that is committed to your success.`,
      price: 24.95,
      rating: 5,
      SKU: '123456_UnelmaCloud',
      tag: 'Popular',
      product_category: productCategories.find(c => c.name === 'Enterprise Software')?.id,
      additionalInfo: 'Additional info will be added later.',
    },
  ];

  for (const product of productsData) {
    const existing = await strapi.db
      .query('api::product.product')
      .findOne({ where: { slug: product.slug } });
    if (!existing) {
      await strapi.entityService.create('api::product.product', {
        data: {
          ...product,
          publishedAt: new Date(),
        },
      });
      console.log(`🆕 Created product: ${product.title}`);
    } else {
      console.log(`ℹ️ Product already exists: ${product.title}`);
    }
  }

  console.log('🌱 Product seeding complete — existing data preserved!');
};
