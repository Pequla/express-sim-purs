import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { configDotenv } from 'dotenv'
import { UserRoute } from './routes/user.route'
import { InvoiceRoute } from './routes/invoice.route'
import { AppDataSource } from './db'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Static routing
app.use(express.static(path.join(__dirname, 'public')));

// Application routes
app.use('/api/user', UserRoute)
app.use('/api/invoice', InvoiceRoute)
// 404 Not Found
app.get('{/*path}', function (req, res) {
    res.status(404).json({
        message: 'NOT_FOUND',
        timestamp: new Date()
    })
})

configDotenv()
const port = Number(process.env.SERVER_PORT)

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    })
    .catch((e) => console.log('Database connection failed', e))