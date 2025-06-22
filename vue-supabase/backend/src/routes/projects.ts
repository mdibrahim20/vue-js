// backend/src/routes/projects.ts
import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({ include: { tasks: true } })
  res.json(projects)
})

export default router
