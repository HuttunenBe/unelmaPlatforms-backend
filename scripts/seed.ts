function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default async ({ strapi }: { strapi: any }) => {
  console.log('🌱 Starting Unelma database seeding (safe mode)...');

  const authorsData = ['Juha', 'Beniitta', 'Anton'].map(name => ({ name }));
  const authors = [];
  for (const author of authorsData) {
    const existing = await strapi.db.query('api::author.author').findOne({ where: { name: author.name } });
    if (existing) {
      authors.push(existing);
    } else {
      const created = await strapi.entityService.create('api::author.author', { data: author });
      authors.push(created);
    }
  }
  console.log('✅ Authors ensured.');

  const categoriesData = ['Community', 'Inspiration', 'Tech Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const categories = [];
  for (const cat of categoriesData) {
    const existing = await strapi.db.query('api::category.category').findOne({ where: { slug: cat.slug } });
    if (existing) {
      categories.push(existing);
    } else {
      const created = await strapi.entityService.create('api::category.category', { data: cat });
      categories.push(created);
    }
  }
  console.log('✅ Categories ensured.');

  const tagsData = ['Unelma', 'Mindfulness', 'WebDev', 'Tips'].map(name => ({
    name,
    slug: slugify(name),
  }));
  const tags = [];
  for (const tag of tagsData) {
    const existing = await strapi.db.query('api::tag.tag').findOne({ where: { slug: tag.slug } });
    if (existing) {
      tags.push(existing);
    } else {
      const created = await strapi.entityService.create('api::tag.tag', { data: tag });
      tags.push(created);
    }
  }
  console.log('✅ Tags ensured.');

  const blogsData = [
    {
      title: 'Welcome to Unelma!',
      content:
        'We are thrilled to launch our new Unelma platform! Here you can share your projects, find inspiration, and connect with our amazing community.',
      excerpt: 'Introduction to the Unelma community blog.',
      author: authors[0].id,
      category: categories.find(c => c.name === 'Community')?.id,
      tags: [tags.find(t => t.name === 'Unelma')?.id, tags.find(t => t.name === 'Mindfulness')?.id],
    },
    {
      title: '5 Tips for Mindful Productivity',
      content:
        'Mindfulness can help you focus better, manage your time, and boost creativity. Here are 5 actionable tips to integrate mindfulness into your daily workflow.',
      excerpt: 'Boost focus and creativity with mindfulness.',
      author: authors[1].id,
      category: categories.find(c => c.name === 'Inspiration')?.id,
      tags: [tags.find(t => t.name === 'Mindfulness')?.id, tags.find(t => t.name === 'Tips')?.id],
    },
    {
      title: 'Unelma Platform Tech Overview',
      content:
        'A behind-the-scenes look at how we built the Unelma platform: Strapi, Next.js, and a modern headless architecture powering our community features.',
      excerpt: 'Tech insights into the Unelma platform.',
      author: authors[2].id,
      category: categories.find(c => c.name === 'Tech Tips')?.id,
      tags: [tags.find(t => t.name === 'WebDev')?.id, tags.find(t => t.name === 'Unelma')?.id],
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
