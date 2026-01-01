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

// Простейшее in-memory хранилище кодов подтверждения (на время разработки)
// Ключ: email, Значение: { code, expiresAt }
const verificationStore = new Map<string, { code: string; expiresAt: number }>()

app.use(cors())
app.use(bodyParser.json())
app.use(httpLoggingMiddleware)
app.get('/health', (req: Request, res: Response) => res.send('ok'))
app.post('/email', async (req: Request, res: Response) => {
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
			// Сохраняем код во временное in-memory хранилище на 5 минут
			verificationStore.set(email, {
				code: String(code),
				expiresAt: Date.now() + 5 * 60 * 1000,
			})

			res.status(200).json({
				message: 'Код отправлен на email',
				success: true,
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

// Проверка кода и редирект на /taxi-list при успехе
app.get('/verify', (req: Request, res: Response) => {
	try {
		const { email, code } = req.query as { email?: string; code?: string }

		if (!email || !code) {
			return res.status(400).json({ message: 'Параметры email и code обязательны', success: false })
		}

		const record = verificationStore.get(email)
		if (!record) {
			return res.status(400).json({ message: 'Код не найден или истёк', success: false })
		}

		if (Date.now() > record.expiresAt) {
			verificationStore.delete(email)
			return res.status(400).json({ message: 'Код истёк', success: false })
		}

		if (String(code) !== record.code) {
			return res.status(400).json({ message: 'Неверный код', success: false })
		}

		// Очистим код после успешной проверки
		verificationStore.delete(email)

		res.status(200).json({
      message: 'Код верный',
      success: true,
    })
	} catch (error) {
		console.error('Ошибка в /verify:', error)
		return res.status(500).json({ message: 'Внутренняя ошибка сервера', success: false })
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
