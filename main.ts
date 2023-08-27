import express, { Request, Response, Application } from 'express'
import { employeeById } from './db-operations'

const app: Application = express()
const port = process.env.PORT || 5000

app.set('json spaces', 2)

app.get('/', (req: Request, res: Response) => {
  res.send(`[${new Date().toISOString()}] Hello Typescript 🔥`)
})

app.get('/employee/:id', async (req: Request, res: Response) => {
  const r = await employeeById(parseInt(req.params.id))
  return r.ok ? res.json(r.value) : res.json(r.error)
})

app.listen(port, () => {
  console.log(`🟢 Server is running at http://localhost:${port}`)
})
