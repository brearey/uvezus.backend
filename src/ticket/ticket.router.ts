import { Router, Response } from 'express';
import TicketController from './ticket.controller';
import {
  Ticket,
  TicketStatus,
  UpdateStatus,
  ResponseType,
  DatesFilterType,
} from './ticket.types';

const router = Router();

router.post('/create', async (req, res): Promise<void> => {
  if (req.body?.topic && req.body?.message) {
    const ticket: Ticket = {
      id: null,
      topic: req.body.topic,
      message: req.body.message,
      status: TicketStatus.NEW,
      resolution: null,
      cancelledReason: null,
    };
    resSend(
      {
        ok: true,
        message: await TicketController.create(ticket),
        status: 201,
      },
      res,
    );
  } else {
    resSend(
      {
        ok: false,
        message: 'topic and message required',
        status: 400,
      },
      res,
    );
  }
});

router.put('/progress', async (req, res): Promise<void> => {
  if (req.body?.id) {
    const data: UpdateStatus = {
      id: req.body.id,
      status: TicketStatus.IN_PROGRESS,
      resolution: null,
      cancelledReason: null,
    };
    resSend(
      {
        ok: true,
        message: await TicketController.updateStatus(data),
        status: 200,
      },
      res,
    );
  } else {
    resSend(
      {
        ok: false,
        message: 'id required',
        status: 400,
      },
      res,
    );
  }
});

router.put('/complete', async (req, res): Promise<void> => {
  if (req.body?.id && req.body?.resolution) {
    const data: UpdateStatus = {
      id: req.body.id,
      status: TicketStatus.COMPLETED,
      resolution: req.body.resolution,
      cancelledReason: null,
    };
    resSend(
      {
        ok: true,
        message: await TicketController.updateStatus(data),
        status: 200,
      },
      res,
    );
  } else {
    resSend(
      {
        ok: false,
        message: 'id and resolution required',
        status: 400,
      },
      res,
    );
  }
});

router.put('/cancel', async (req, res): Promise<void> => {
  if (req.body?.id && req.body?.cancelledReason) {
    const data: UpdateStatus = {
      id: req.body.id,
      status: TicketStatus.CANCELLED,
      resolution: null,
      cancelledReason: req.body.cancelledReason,
    };
    resSend(
      {
        ok: true,
        message: await TicketController.updateStatus(data),
        status: 200,
      },
      res,
    );
  } else {
    resSend(
      {
        ok: false,
        message: 'id and cancelledReason required',
        status: 400,
      },
      res,
    );
  }
});

router.put('/cancel-all', async (req, res): Promise<void> => {
  if (req.body?.cancelledReason) {
    resSend(
      {
        ok: true,
        message: await TicketController.cancelAll(req.body.cancelledReason),
        status: 200,
      },
      res,
    );
  } else {
    resSend(
      {
        ok: false,
        message: 'cancelledReason required',
        status: 400,
      },
      res,
    );
  }
});

router.get('/', async (req, res): Promise<void> => {
  const datesRange =
    req.query.fromDate && req.query.toDate
      ? {
          gte: new Date(req.query.fromDate.toString()).toISOString(),
          lte: new Date(req.query.toDate.toString()).toISOString(),
        }
      : undefined;

  const data: DatesFilterType = {
    datesRange,
  };

  resSend(
    {
      ok: true,
      message: await TicketController.getAll(data),
      status: 200,
    },
    res,
  );
});

// private
function resSend(resp: ResponseType, res: Response): void {
  res.status(resp.status).send(resp);
}

export default router;
