import pool from '../config/db.js';
import { successResponse, errorResponse, notFoundResponse } from '../utils/apiResponce.js';

// 📌 Create Ticket
export const createTicket = async (req, res) => {
  const { user_id, assigned_to, subject, description, status, priority } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tickets (user_id, assigned_to, subject, description, status, priority) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, assigned_to, subject, description, status, priority]
    );
    return successResponse(res, 'Ticket created successfully', result.rows[0]);
  } catch (error) {
    console.error('Error creating ticket:', error.message);
    return errorResponse(res, 'Error creating ticket', error.message);
  }
};

// 📌 Get All Tickets
export const getAllTickets = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as user_name, a.name as assigned_to_name
       FROM tickets t
       LEFT JOIN users u ON t.user_id = u.user_id
       LEFT JOIN users a ON t.assigned_to = a.user_id
       ORDER BY t.created_at DESC`
    );
    return successResponse(res, 'Tickets fetched successfully', result.rows);
  } catch (error) {
    console.error('Error fetching tickets:', error.message);
    return errorResponse(res, 'Error fetching tickets', error.message);
  }
};

// 📌 Get Ticket by ID
export const getTicketById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as user_name, a.name as assigned_to_name
       FROM tickets t
       LEFT JOIN users u ON t.user_id = u.user_id
       LEFT JOIN users a ON t.assigned_to = a.user_id
       WHERE t.ticket_id = $1`, 
      [id]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res, 'Ticket not found');
    }
    return successResponse(res, 'Ticket fetched successfully', result.rows[0]);
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    return errorResponse(res, 'Error fetching ticket', error.message);
  }
};

//📌 Get All Assigned Tickets for a User
export const getAllAssignedTickets = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as user_name, a.name as assigned_to_name
       FROM tickets t
       LEFT JOIN users u ON t.user_id = u.user_id
       LEFT JOIN users a ON t.assigned_to = a.user_id
       WHERE t.assigned_to = $1
       ORDER BY t.created_at DESC`,
      [id]
    );
    return successResponse(res, 'Assigned tickets fetched successfully', result.rows);
  } catch (error) {
    console.error('Error fetching assigned tickets:', error.message);
    return errorResponse(res, 'Error fetching assigned tickets', error.message);
  }
};

// 📌 Get All Created Tickets for a User
export const getAllCreatedTickets = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT t.*, u.name as user_name, a.name as assigned_to_name
       FROM tickets t
       LEFT JOIN users u ON t.user_id = u.user_id
       LEFT JOIN users a ON t.assigned_to = a.user_id
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC`,
      [id]
    );
    return successResponse(res, 'Created tickets fetched successfully', result.rows);
  } catch (error) {
    console.error('Error fetching created tickets:', error.message);
    return errorResponse(res, 'Error fetching created tickets', error.message);
  }
};

// 📌 Update Ticket
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { assigned_to, subject, description, status, priority } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tickets 
       SET assigned_to = $1, subject = $2, description = $3, status = $4, priority = $5, updated_at = NOW() 
       WHERE ticket_id = $6 RETURNING *`,
      [assigned_to, subject, description, status, priority, id]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res, 'Ticket not found');
    }
    return successResponse(res, 'Ticket updated successfully', result.rows[0]);
  } catch (error) {
    console.error('Error updating ticket:', error.message);
    return errorResponse(res, 'Error updating ticket', error.message);
  }
};

// 📌 Delete Ticket
export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM tickets WHERE ticket_id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return notFoundResponse(res, 'Ticket not found');
    }
    return successResponse(res, 'Ticket deleted successfully', result.rows[0]);
  } catch (error) {
    console.error('Error deleting ticket:', error.message);
    return errorResponse(res, 'Error deleting ticket', error.message);
  }
};
// 📌 Get Ticket Logs by Ticket ID
export const getTicketLogs = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT tl.*, u.name as action_by_name
       FROM ticket_logs tl
       LEFT JOIN users u ON tl.action_by = u.user_id
       WHERE tl.ticket_id = $1
       ORDER BY tl.timestamp DESC`,
      [id]
    );
    return successResponse(res, 'Ticket logs fetched successfully', result.rows);
  } catch (error) {
    console.error('Error fetching ticket logs:', error.message);
    return errorResponse(res, 'Error fetching ticket logs', error.message);
  }
};

// 📌 Add Ticket Log
export const addTicketLog = async (req, res) => {
  const { ticket_id, action_by, action } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO ticket_logs (ticket_id, action_by, action) VALUES ($1, $2, $3) RETURNING *`,
      [ticket_id, action_by, action]
    );
    return successResponse(res, 'Ticket log added successfully', result.rows[0]);
  } catch (error) {
    console.error('Error adding ticket log:', error.message);
    return errorResponse(res, 'Error adding ticket log', error.message);
  }
};
