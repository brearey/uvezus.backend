import dotenv from 'dotenv'
dotenv.config()
import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { httpLoggingMiddleware } from './utils/http-logger'
import { sendEmail } from './utils/mail'
import { getRandom } from './utils/random'

const app: Application = express()
const PORT = 3002

app.use(cors())
app.use(bodyParser.json())
app.use(httpLoggingMiddleware)
app.get('/api/health', (req, res) => res.send('ok'))
app.post('/api/email', async (req: Request, res: Response) => {
	try {
		const { email } = req.body

		// Валидация email
		if (!email) {
			return res.status(400).json({
				message: 'Email обязателен',
				success: false,
			})
		}

		const code = getRandom(1000, 9999)
		const result = await sendEmail(
			email,
			'Код для входа в Увезусь',
			`Ваш код для входа ${code}`,
			`<div>Ваш код для входа <b>${code}</b></div>`
		)

		if (result) {
			// TODO: Сохранить код в базу данных или кэш
			// например: await saveVerificationCode(email, code)

			res.status(200).json({
				message: 'Код отправлен на email',
				success: true,
				code: code // TODO: don't send code
			})
		} else {
			res.status(500).json({
				message: 'Ошибка при отправке email',
				success: false,
			})
		}
	} catch (error) {
		console.error('Ошибка в /api/email:', error)
		res.status(500).json({
			message: 'Внутренняя ошибка сервера',
			success: false,
		})
	}
})

async function start() {
	try {
		await app.listen(PORT, () => {
			console.log(`Server running at ${PORT}`)
		})
	} catch (e) {
		console.error(e)
	}
}

start()
