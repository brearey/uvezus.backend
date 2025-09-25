import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { httpLoggingMiddleware } from './utils/http-logger'

const app: Application = express()
const PORT = 3002

app.use(cors())
app.use(bodyParser.json())
app.use(httpLoggingMiddleware)
app.get('/api/health', (req, res) => res.send('ok'))
app.post('/api/email', (req: Request, res: Response) => {
	if (req.body.email) {
		res.status(200).json({
			message: 'ok',
			code: 1234,
		})
	}
})

async function start() {
	try {
		await app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`)
		})
	} catch (e) {
		console.error(e)
	}
}

start()
