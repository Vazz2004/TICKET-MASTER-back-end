import express, { json } from 'express'
import corsMiddleware from './middlewares/cors.middleware.js'
import { apptiked } from './routes/userRoutes.js' // Corrected the import name
const PORT = 5000
const app = express()

app.use(corsMiddleware()) // Ensure corsMiddleware is correctly implemented
app.use(json())
app.use('/tiked', apptiked) // Corrected the route name

app.get('/', (req, res) => res.json('Hello World!'))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
