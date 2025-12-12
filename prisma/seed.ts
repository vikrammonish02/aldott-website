import { PrismaClient, Role, PostStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('changeme', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@aldott.test' },
    update: {},
    create: {
      name: 'Vikram Singh Rajput',
      email: 'admin@aldott.test',
      password: adminPassword,
      role: Role.ADMIN,
      bio: 'Founder & Lead Engineer',
      linkedIn: 'https://www.linkedin.com',
    }
  });

  const tags = await prisma.tag.createMany({
    data: [
      { name: 'Offshore', slug: 'offshore' },
      { name: 'Floating', slug: 'floating' },
      { name: 'Certification', slug: 'certification' },
      { name: 'Loads', slug: 'loads' }
    ],
    skipDuplicates: true,
  });

  const offshoreTag = await prisma.tag.findUnique({ where: { slug: 'offshore' } });
  const floatingTag = await prisma.tag.findUnique({ where: { slug: 'floating' } });

  await prisma.post.upsert({
    where: { slug: 'linked-loads-readiness' },
    update: {},
    create: {
      title: 'Linked Loads Readiness for Offshore Programs',
      slug: 'linked-loads-readiness',
      content: '<p>Certification aligned loads program overview.</p>',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      authorId: admin.id,
      tags: offshoreTag && floatingTag ? { create: [
        { tagId: offshoreTag.id },
        { tagId: floatingTag.id }
      ] } : undefined
    }
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'HT1 Aberdeen Bay',
        slug: 'ht1-aberdeen-bay',
        summary: 'Hybrid offshore wind + hydrogen demonstrator with phased build-out.',
        body: 'OpenFAST driven validation and certifier dialogue.',
        tags: 'Offshore,Hydrogen',
        location: 'UK North Sea',
        projectType: 'Offshore'
      },
      {
        title: 'Brittany Floating Wind',
        slug: 'brittany-floating',
        summary: 'Pre-FEED floating demonstrator with multi-body dynamics.',
        body: 'Floating DLC coverage and stability validation.',
        tags: 'Floating',
        location: 'France',
        projectType: 'Floating'
      }
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
