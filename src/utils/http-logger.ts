import { type Request, type Response, type NextFunction } from 'express'

export function httpLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
	const now = new Date(Date.now())

	const getClientIp = (req: Request) => {
		return (
			req.headers['x-real-ip'] ||
			req.socket.remoteAddress ||
			req.ip ||
			'unknown'
		)
	}

	const clientIp = getClientIp(req)

	console.info(
		`${now.toLocaleString()} | method: ${req.method} | path: ${req.path} | from IP: ${clientIp} | user-agent: ${req.headers['user-agent']}`
	)
	next()
}
