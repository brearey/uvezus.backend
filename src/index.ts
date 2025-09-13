import express, { Application, Request, Response } from 'express'
import ticketRouter from './ticket/ticket.router'
import bodyParser from 'body-parser'

const app: Application = express()
const PORT = 3002

app.use(bodyParser.json())
app.use('/api/tickets', ticketRouter)
app.post('/api/email', (req: Request, res: Response) => {
	if (req.body.email) {
		res.status(200).json({
			message: 'ok',
			email: req.body.email,
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
