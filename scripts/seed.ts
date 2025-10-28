function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async ({ strapi }: { strapi: any }) => {
  console.log('🌱 Starting Unelma database seeding...');

  // delete existing data
  await strapi.db.query('api::blog.blog').deleteMany({});
  await strapi.db.query('api::author.author').deleteMany({});
  await strapi.db.query('api::category.category').deleteMany({});
  await strapi.db.query('api::tag.tag').deleteMany({});

  const authorsData = ['Juha', 'Beniitta', 'Anton'].map(name => ({ name }));
  const authors = [];
  for (const author of authorsData) {
    const created = await strapi.entityService.create('api::author.author', { data: author });
    authors.push(created);
  }
  console.log('✅ Authors created.');

  const categoriesData = ['Community', 'Inspiration', 'Tech Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const categories = [];
  for (const cat of categoriesData) {
    const created = await strapi.entityService.create('api::category.category', { data: cat });
    categories.push(created);
  }
  console.log('✅ Categories created.');

  const tagsData = ['Unelma', 'Mindfulness', 'WebDev', 'Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const tags = [];
  for (const tag of tagsData) {
    const created = await strapi.entityService.create('api::tag.tag', { data: tag });
    tags.push(created);
  }
  console.log('✅ Tags created.');

  const blogsData = [
    {
      title: 'Welcome to Unelma!',
      content: 'We are thrilled to launch our new Unelma platform! Here you can share your projects, find inspiration, and connect with our amazing community.',
      excerpt: 'Introduction to the Unelma community blog.',
      author: authors[0].id,
      category: categories.find(c => c.name === 'Community')?.id,
      tags: [tags.find(t => t.name === 'Unelma')?.id, tags.find(t => t.name === 'Mindfulness')?.id],
    },
    {
      title: '5 Tips for Mindful Productivity',
      content: 'Mindfulness can help you focus better, manage your time, and boost creativity. Here are 5 actionable tips to integrate mindfulness into your daily workflow.',
      excerpt: 'Boost focus and creativity with mindfulness.',
      author: authors[1].id,
      category: categories.find(c => c.name === 'Inspiration')?.id,
      tags: [tags.find(t => t.name === 'Mindfulness')?.id, tags.find(t => t.name === 'Tips')?.id],
    },
    {
      title: 'Unelma Platform Tech Overview',
      content: 'A behind-the-scenes look at how we built the Unelma platform: Strapi, Next.js, and a modern headless architecture powering our community features.',
      excerpt: 'Tech insights into the Unelma platform.',
      author: authors[2].id,
      category: categories.find(c => c.name === 'Tech Tips')?.id,
      tags: [tags.find(t => t.name === 'WebDev')?.id, tags.find(t => t.name === 'Unelma')?.id],
    },
  ];

  for (const blog of blogsData) {
    await strapi.entityService.create('api::blog.blog', {
      data: {
        ...blog,
        slug: slugify(blog.title),
        publishedAt: new Date(),
      },
    });
  }

  console.log('✅ Blogs created with slugs and image.');
  console.log('🌱 Unelma database seeding complete!');
};
