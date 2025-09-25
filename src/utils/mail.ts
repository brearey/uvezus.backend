import nodemailer from 'nodemailer'

// Создаем транспорт для подключения к SMTP Яндекса
const transporter = nodemailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 587,
	secure: false,
	auth: {
		user: 'brearey88@yandex.ru',
		pass: process.env.YANDEX_APP_PASSWORD,
	},
})

export async function sendEmail(
	to: string,
	subject: string = 'Приложение Увезусь',
	text: string = '',
	html: string = ''
): Promise<boolean> {
	const mailOptions = {
		from: '"Приложение Увезусь" <brearey88@yandex.ru>',
		to: to,
		subject: subject,
		text: text,
		html: html,
	}

	try {
		const info = await transporter.sendMail(mailOptions)
		console.log('Письмо отправлено:', info.messageId)
		return true
	} catch (error) {
		console.log('Ошибка отправки:', error)
		return false
	}
}
