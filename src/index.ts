import express, { Application } from 'express';
import ticketRouter from './ticket/ticket.router';
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use('/api/tickets', ticketRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
