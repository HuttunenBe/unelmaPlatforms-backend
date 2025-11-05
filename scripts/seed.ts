function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async ({ strapi }: { strapi: any }) => {
  console.log('🌱 Starting Unelma database seeding (safe mode)...');

  const authorsData = ['Juha', 'Beniitta', 'Anton'].map(name => ({ name }));
  const authors: any[] = [];

  for (const author of authorsData) {
    const existing = await strapi.db.query('api::author.author').findOne({ where: { name: author.name } });
    const ensured = existing
      ? existing
      : await strapi.entityService.create('api::author.author', { data: author });
    authors.push(ensured);
  }
  console.log('✅ Authors ensured.');

  const categoriesData = ['Community', 'Inspiration', 'Tech Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const categories: any[] = [];

  for (const cat of categoriesData) {
    const existing = await strapi.db.query('api::category.category').findOne({ where: { slug: cat.slug } });
    const ensured = existing
      ? existing
      : await strapi.entityService.create('api::category.category', { data: cat });
    categories.push(ensured);
  }
  console.log('✅ Categories ensured.');

  const tagsData = ['Unelma', 'Mindfulness', 'WebDev', 'Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const tags: any[] = [];

  for (const tag of tagsData) {
    const existing = await strapi.db.query('api::tag.tag').findOne({ where: { slug: tag.slug } });
    const ensured = existing
      ? existing
      : await strapi.entityService.create('api::tag.tag', { data: tag });
    tags.push(ensured);
  }
  console.log('✅ Tags ensured.');

  const blogsData = [
    {
      title: 'Welcome to Unelma!',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'We are thrilled to launch our new Unelma platform! Here you can share your projects, find inspiration, and connect with our amazing community.',
            },
          ],
        },
      ],
      excerpt: 'Introduction to the Unelma community blog.',
      author: authors[0].id,
      category: categories.find(c => c.name === 'Community')?.id,
      tags: [tags.find(t => t.name === 'Unelma')?.id, tags.find(t => t.name === 'Mindfulness')?.id],
      publishedDate: new Date().toISOString(),
    },
    {
      title: '5 Tips for Mindful Productivity',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Mindfulness can help you focus better, manage your time, and boost creativity. Here are 5 actionable tips to integrate mindfulness into your daily workflow.',
            },
          ],
        },
      ],
      excerpt: 'Boost focus and creativity with mindfulness.',
      author: authors[1].id,
      category: categories.find(c => c.name === 'Inspiration')?.id,
      tags: [tags.find(t => t.name === 'Mindfulness')?.id, tags.find(t => t.name === 'Tips')?.id],
      publishedDate: new Date().toISOString(),
    },
    {
      title: 'Unelma Platform Tech Overview',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'A behind-the-scenes look at how we built the Unelma platform: Strapi, Next.js, and a modern headless architecture powering our community features.',
            },
          ],
        },
      ],
      excerpt: 'Tech insights into the Unelma platform.',
      author: authors[2].id,
      category: categories.find(c => c.name === 'Tech Tips')?.id,
      tags: [tags.find(t => t.name === 'WebDev')?.id, tags.find(t => t.name === 'Unelma')?.id],
      publishedDate: new Date().toISOString(),
    },
  ];

  for (const blog of blogsData) {
    const slug = slugify(blog.title);
    const existing = await strapi.db.query('api::blog.blog').findOne({ where: { slug } });

    if (!existing) {
      await strapi.entityService.create('api::blog.blog', {
        data: {
          ...blog,
          slug,
          publishedAt: new Date(),
        },
      });
      console.log(`🆕 Created blog: ${blog.title}`);
    } else {
      console.log(`ℹ️ Blog already exists: ${blog.title}`);
    }
  }

  console.log('🌱 Safe seeding complete — existing data preserved!');
};

