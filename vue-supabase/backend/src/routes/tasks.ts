// backend/src/routes/tasks.ts
import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ include: { project: true } })
  res.json(tasks)
})

export default router
