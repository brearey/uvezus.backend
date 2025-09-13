import axios from 'axios';
import { TicketStatus } from '../ticket/ticket.types';

const API_BASE_URL = 'http://localhost:3002/api/tickets';

describe('Ticket API Tests', () => {
  let createdTicketId: number;

  // Test 1
  test('Create ticket', async () => {
    const response = await axios.post(`${API_BASE_URL}/create`, {
      topic: 'Jest topic',
      message: 'Testing with Jest',
    });

    expect(response.status).toBe(201);
    expect(response.data.message).toHaveProperty('id');
    createdTicketId = response.data.message.id;
  });

  // Test 2
  test('Put ticket in progress', async () => {
    const response = await axios.put(`${API_BASE_URL}/progress`, {
      id: createdTicketId,
    });

    expect(response.status).toBe(200);
    expect(response.data.message.status).toBe(TicketStatus.IN_PROGRESS);
  });

  // Test 3
  test('Complete ticket', async () => {
    const resolutionText = 'this is genius resolution';
    const response = await axios.put(`${API_BASE_URL}/complete`, {
      id: createdTicketId,
      resolution: resolutionText,
    });

    expect(response.status).toBe(200);
    expect(response.data.message.status).toBe(TicketStatus.COMPLETED);
    expect(response.data.message.resolution).toBe(resolutionText);
  });

  // Test 4
  test('Cancel ticket', async () => {
    const cancelReason = 'cancelled because i feel bored';
    const response = await axios.put(`${API_BASE_URL}/cancel`, {
      id: createdTicketId,
      cancelledReason: cancelReason,
    });

    expect(response.status).toBe(200);
    expect(response.data.message.status).toBe(TicketStatus.CANCELLED);
    expect(response.data.message.cancelledReason).toBe(cancelReason);
  });

  // Test 5
  test('Cancel all tickets', async () => {
    const cancelReason = 'all cancel reason is this';
    const response = await axios.put(`${API_BASE_URL}/cancel-all`, {
      cancelledReason: cancelReason,
    });

    expect(response.status).toBe(200);
    expect(response.data.message.count).toBeGreaterThanOrEqual(0);
  });

  // Test 6
  test('Get tickets filtered by current day', async () => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 0);

    const response = await axios.get(`${API_BASE_URL}/`, {
      params: {
        fromDate: todayStart.toISOString(),
        toDate: todayEnd.toISOString(),
      },
      headers: {
        Accept: 'application/json',
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.message)).toBeTruthy();
  });

  // test 7
  test('Get tickets filtered by date range', async () => {
    const today = new Date();
    const toDate = new Date(today);
    toDate.setDate(today.getDate() + 15);

    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 15);

    const response = await axios.get(`${API_BASE_URL}/`, {
      params: {
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      },
      headers: {
        Accept: 'application/json',
      },
    });

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.message)).toBeTruthy();
  });
});
