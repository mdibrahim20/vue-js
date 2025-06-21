import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SERVICE_ROLE_KEY)

const seedProjects = async (numEntries) => {
  const projects = []
  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)
    projects.push({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      status: faker.helpers.arrayElement(['active', 'archived', 'deleted']),
      collaborators: faker.helpers.arrayElements(['user1', 'user2', 'user3'], { min: 1, max: 3 }),
    })
  }

  const { data: insertedProjects, error } = await supabase
    .from('projects')
    .insert(projects)
    .select('id') // Need IDs for tasks

  if (error) throw error
  console.log('Projects seeded successfully!')

  return insertedProjects
}

const seedTasks = async (projects, numTasksPerProject) => {
  const tasks = []

  for (const project of projects) {
    for (let i = 0; i < numTasksPerProject; i++) {
      tasks.push({
        name: faker.hacker.phrase(),
        status: faker.helpers.arrayElement(['active', 'archived', 'deleted']),
        description: faker.lorem.sentences(2),
        due_date: faker.date.soon(30).toISOString().split('T')[0],
        project_id: faker.helpers.arrayElement(project.id),
        collaborators: faker.helpers.arrayElements(['user1', 'user2', 'user3'], { min: 1, max: 3 }),
      })
    }
  }

  const { error } = await supabase.from('tasks').insert(tasks)
  if (error) throw error

  console.log('Tasks seeded successfully!')
}

const main = async () => {
  const projects = await seedProjects(10)
  await seedTasks(projects, 5) // 5 tasks per project
}

main()
