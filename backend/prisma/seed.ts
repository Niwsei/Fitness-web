import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Admin user ────────────────────────────────────────────────
  const admin = await prisma.user.upsert({
    where: { email: 'admin@fitstore.com' },
    update: {},
    create: {
      email: 'admin@fitstore.com',
      password: await bcrypt.hash('Admin123!', 12),
      firstName: 'Admin',
      lastName: 'User',
      role: Role.ADMIN,
    },
  })
  console.log(`✅ Admin created: ${admin.email}`)

  // ─── Test customer ─────────────────────────────────────────────
  await prisma.user.upsert({
    where: { email: 'customer@fitstore.com' },
    update: {},
    create: {
      email: 'customer@fitstore.com',
      password: await bcrypt.hash('Customer123!', 12),
      firstName: 'John',
      lastName: 'Doe',
      role: Role.CUSTOMER,
      fitnessGoal: 'MUSCLE_GAIN',
    },
  })
  console.log('✅ Test customer created')

  // ─── Categories ────────────────────────────────────────────────
  const protein = await prisma.category.upsert({
    where: { slug: 'protein' },
    update: {},
    create: { name: 'Protein', slug: 'protein', description: 'Whey, Casein & Plant-based proteins', sortOrder: 1 },
  })

  const preworkout = await prisma.category.upsert({
    where: { slug: 'pre-workout' },
    update: {},
    create: { name: 'Pre-Workout', slug: 'pre-workout', description: 'Energy & focus supplements', sortOrder: 2 },
  })

  const vitamins = await prisma.category.upsert({
    where: { slug: 'vitamins' },
    update: {},
    create: { name: 'Vitamins & Minerals', slug: 'vitamins', description: 'Essential vitamins and minerals', sortOrder: 3 },
  })

  console.log('✅ Categories created')

  // ─── Products ──────────────────────────────────────────────────
  const wheyProtein = await prisma.product.upsert({
    where: { slug: 'gold-standard-whey-protein' },
    update: {},
    create: {
      sku: 'WHEY-GOLD-001',
      name: 'Gold Standard Whey Protein',
      slug: 'gold-standard-whey-protein',
      description: 'The world\'s best-selling whey protein. 24g of protein per serving with minimal fat and carbs.',
      shortDesc: '24g protein per serving | 5.5g BCAAs | Multiple flavors',
      categoryId: protein.id,
      brand: 'Optimum Nutrition',
      price: 49.99,
      comparePrice: 59.99,
      costPrice: 25.00,
      isFeatured: true,
      fitnessGoals: ['MUSCLE_GAIN', 'ENDURANCE'],
      tags: ['whey', 'protein', 'muscle', 'recovery'],
      variants: {
        create: [
          { sku: 'WHEY-GOLD-1KG-CHOC', name: '1kg - Chocolate', stockQuantity: 50 },
          { sku: 'WHEY-GOLD-1KG-VAN', name: '1kg - Vanilla', stockQuantity: 35 },
          { sku: 'WHEY-GOLD-1KG-STR', name: '1kg - Strawberry', stockQuantity: 20 },
          { sku: 'WHEY-GOLD-2KG-CHOC', name: '2kg - Chocolate', priceModifier: 30, stockQuantity: 15 },
          { sku: 'WHEY-GOLD-2KG-VAN', name: '2kg - Vanilla', priceModifier: 30, stockQuantity: 10 },
        ],
      },
      images: {
        create: [{ url: 'https://placehold.co/600x600?text=Whey+Protein', altText: 'Gold Standard Whey', isPrimary: true, sortOrder: 0 }],
      },
    },
  })

  await prisma.product.upsert({
    where: { slug: 'creatine-monohydrate' },
    update: {},
    create: {
      sku: 'CREATINE-001',
      name: 'Creatine Monohydrate',
      slug: 'creatine-monohydrate',
      description: 'Pure micronized creatine monohydrate. Supports muscle strength, power, and recovery.',
      shortDesc: '5g pure creatine per serving | Micronized | Unflavored',
      categoryId: protein.id,
      brand: 'FitStore Essentials',
      price: 19.99,
      isFeatured: true,
      fitnessGoals: ['MUSCLE_GAIN', 'ENDURANCE'],
      tags: ['creatine', 'strength', 'power'],
      variants: {
        create: [
          { sku: 'CREATINE-300G', name: '300g', stockQuantity: 80 },
          { sku: 'CREATINE-500G', name: '500g', priceModifier: 10, stockQuantity: 60 },
        ],
      },
      images: {
        create: [{ url: 'https://placehold.co/600x600?text=Creatine', altText: 'Creatine Monohydrate', isPrimary: true, sortOrder: 0 }],
      },
    },
  })

  await prisma.product.upsert({
    where: { slug: 'pre-workout-extreme' },
    update: {},
    create: {
      sku: 'PREWORK-001',
      name: 'Pre-Workout Extreme',
      slug: 'pre-workout-extreme',
      description: 'High-energy pre-workout formula with caffeine, beta-alanine, and citrulline malate.',
      shortDesc: '300mg caffeine | Beta-Alanine | Citrulline Malate',
      categoryId: preworkout.id,
      brand: 'FitStore Pro',
      price: 39.99,
      comparePrice: 44.99,
      isFeatured: false,
      fitnessGoals: ['MUSCLE_GAIN', 'ENDURANCE'],
      tags: ['pre-workout', 'energy', 'pump', 'caffeine'],
      variants: {
        create: [
          { sku: 'PREWORK-300G-FRUIT', name: '300g - Fruit Punch', stockQuantity: 30 },
          { sku: 'PREWORK-300G-BLUE', name: '300g - Blue Raspberry', stockQuantity: 25 },
        ],
      },
      images: {
        create: [{ url: 'https://placehold.co/600x600?text=Pre-Workout', altText: 'Pre-Workout Extreme', isPrimary: true, sortOrder: 0 }],
      },
    },
  })

  await prisma.product.upsert({
    where: { slug: 'omega-3-fish-oil' },
    update: {},
    create: {
      sku: 'OMEGA3-001',
      name: 'Omega-3 Fish Oil',
      slug: 'omega-3-fish-oil',
      description: 'High-quality omega-3 fish oil with EPA and DHA for heart, brain, and joint health.',
      shortDesc: '1000mg per capsule | EPA + DHA | 180 softgels',
      categoryId: vitamins.id,
      brand: 'FitStore Essentials',
      price: 14.99,
      isFeatured: false,
      fitnessGoals: ['MAINTENANCE', 'ENDURANCE'],
      tags: ['omega-3', 'fish-oil', 'health', 'heart'],
      variants: {
        create: [
          { sku: 'OMEGA3-90CAP', name: '90 Softgels', stockQuantity: 100 },
          { sku: 'OMEGA3-180CAP', name: '180 Softgels', priceModifier: 10, stockQuantity: 80 },
        ],
      },
      images: {
        create: [{ url: 'https://placehold.co/600x600?text=Omega+3', altText: 'Omega-3 Fish Oil', isPrimary: true, sortOrder: 0 }],
      },
    },
  })

  // ─── Discount Codes ────────────────────────────────────────────
  await prisma.discountCode.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      type: 'PERCENTAGE',
      value: 10,
      minOrderValue: 30,
      maxUses: 1000,
      isActive: true,
    },
  })

  await prisma.discountCode.upsert({
    where: { code: 'FIRST20' },
    update: {},
    create: {
      code: 'FIRST20',
      type: 'FIXED_AMOUNT',
      value: 20,
      minOrderValue: 80,
      maxUses: 500,
      isActive: true,
    },
  })

  console.log(`✅ Products and discount codes created`)
  console.log('\n🎉 Seed completed successfully!')
  console.log('\n🔑 Test credentials:')
  console.log('   Admin: admin@fitstore.com / Admin123!')
  console.log('   Customer: customer@fitstore.com / Customer123!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
