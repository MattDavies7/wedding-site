import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import rsvpRoutes from './routes/rsvp'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Wedding site backend is running :->')
})

app.use('/api/rsvp', rsvpRoutes)

export default app