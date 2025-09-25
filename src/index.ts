import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { httpLoggingMiddleware } from './utils/http-logger'
import { sendEmail } from './utils/mail'

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
app.get('/api/send', (req, res) => {
	res.send(sendEmail())
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
