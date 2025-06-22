// backend/prisma/seed.ts
import { PrismaClient, Status } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 10; i++) {
    const project = await prisma.project.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.company.name().toLowerCase()),
        status: faker.helpers.arrayElement(['active', 'archived', 'deleted']) as Status,
        collaborators: [faker.internet.email()],
      },
    })

    const taskCount = faker.number.int({ min: 5, max: 8 })

    for (let j = 0; j < taskCount; j++) {
      await prisma.task.create({
        data: {
          name: faker.hacker.verb() + ' ' + faker.hacker.noun(),
          description: faker.hacker.phrase(),
          status: faker.helpers.arrayElement(['active', 'archived', 'deleted']) as Status,
          dueDate: faker.datatype.boolean() ? faker.date.future() : null,
          projectId: project.id,
          collaborators: [faker.internet.email(), faker.internet.email()],
        },
      })
    }
  }

  console.log('🌱 Seeded 10 projects with tasks.')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(() => prisma.$disconnect())
