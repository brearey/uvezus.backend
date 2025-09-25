import nodemailer from 'nodemailer'

// Создаем транспорт для подключения к SMTP Яндекса
const transporter = nodemailer.createTransport({
	host: 'smtp.yandex.ru',
	port: 587, // 465 SSL
	secure: false, // true использовать SSL
	auth: {
		user: 'brearey88@yandex.ru',
		pass: process.env.YANDEX_APP_PASSWORD, // пароль приложения указан на странице Безопасность в id.yandex.ru (название пароля copder)
	},
})

// Настройки письма
const mailOptions = {
	from: '"Ваше имя" <brearey88@yandex.ru>',
	to: 'brearey4@gmail.com',
	subject: 'Тестовое письмо',
	text: 'Привет! Это простое текстовое письмо.',
	html: '<h1>Hello</h1>',
}

export function sendEmail() {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log('Ошибка отправки:', error)
				reject(error)
			} else {
				console.log('Письмо отправлено:', info.messageId)
				resolve(info.messageId)
			}
		})
	})
}
