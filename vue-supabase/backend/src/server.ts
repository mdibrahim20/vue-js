// backend/src/server.ts
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import projectsRoutes from './routes/projects'
import tasksRoutes from './routes/tasks'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/projects', projectsRoutes)
app.use('/tasks', tasksRoutes)

app.listen(3001, () => {
  console.log('🚀 API running on http://localhost:3001')
})
