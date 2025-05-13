import express from 'express';
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  getAllAssignedTickets,
  getAllCreatedTickets,
  getTicketLogs,
  addTicketLog
} from '../controller/ticketController.js';

const router = express.Router();

// 📌 Routes for Tickets
router.post('/', createTicket);            // Create a new ticket
router.get('/', getAllTickets);            // Get all tickets
router.get('/:id', getTicketById);        // Get a single ticket by ID
router.put('/:id', updateTicket);  
router.get('/getallasign/:id',getAllAssignedTickets);
router.get('/getallcreate/:id',getAllCreatedTickets); 
router.get('/getticketlog/:id',getTicketLogs);
router.post('/addticketlog',addTicketLog);      // Update a ticket
router.delete('/del/:id', deleteTicket);      // Delete a ticket

export default router;
