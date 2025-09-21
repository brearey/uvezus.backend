enum TicketStatus {
	NEW,
	IN_PROGRESS,
	COMPLETED,
	CANCELLED,
}

type Ticket = {
	id: number | null
	topic: string
	message: string
	status: TicketStatus
	resolution: string | null
	cancelledReason: string | null
}

type UpdateStatus = {
	id: number
	status: TicketStatus
	resolution: string | null
	cancelledReason: string | null
}

type ResponseType = {
	ok: boolean
	message: string | unknown
	status: number
}

type DatesFilterType = {
	datesRange:
		| {
				gte: string
				lte: string
		  }
		| undefined
}

export { TicketStatus, Ticket, UpdateStatus, ResponseType, DatesFilterType }
