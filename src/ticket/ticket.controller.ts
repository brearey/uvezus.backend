import { DatesFilterType, Ticket, UpdateStatus } from './ticket.types'
import TicketModel from './ticket.model'

class TicketController {
	async create(ticket: Ticket): Promise<unknown> {
		if (!ticket.topic || !ticket.message) {
			return {
				message: 'topic and message required',
			}
		}
		return await TicketModel.create(ticket)
	}

	async updateStatus(data: UpdateStatus): Promise<unknown> {
		if (typeof data?.id !== 'number' || !data?.status) {
			return {
				message: 'id should be a number or status required',
			}
		}
		return await TicketModel.updateStatus(data)
	}

	async cancelAll(cancelledReason: string): Promise<unknown> {
		if (!cancelledReason) {
			return {
				message: 'cancelled reason required',
			}
		}
		return await TicketModel.cancelAll(cancelledReason)
	}

	async getAll(data: DatesFilterType): Promise<unknown> {
		return await TicketModel.getAll(data)
	}
}

export default new TicketController()
