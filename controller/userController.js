import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import { successResponse, errorResponse, notFoundResponse } from '../utils/apiResponce.js';

// 📌 Create User
export const createUser = async (req, res) => {
  const { name, email, contact_no, role, password } = req.body;
 
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO users (name, email, contact_no, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, contact_no, role, hashedPassword]
    );
    return successResponse(res, 'User created successfully', result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error.message);
    return errorResponse(res, 'Error creating user', error.message);
  }
};

// 📌 Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return notFoundResponse(res, 'User not found');
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return errorResponse(res, 'Invalid credentials');
    }

    return successResponse(res, 'Login successful', { user });
  } catch (error) {
    console.error('Error during login:', error.message);
    return errorResponse(res, 'Error during login', error.message);
  }
};

// 📌 Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return successResponse(res, 'Users fetched successfully', result.rows);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return errorResponse(res, 'Error fetching users', error.message);
  }
};

// 📌 Get User by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    if (result.rows.length === 0) {
      return notFoundResponse(res, 'User not found');
    }
    return successResponse(res, 'User fetched successfully', result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return errorResponse(res, 'Error fetching user', error.message);
  }
};

// 📌 Update User
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, contact_no, role } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name = $1, email = $2, contact_no = $3, role = $4, updated_at = NOW() WHERE user_id = $5 RETURNING *`,
      [name, email, contact_no, role, id]
    );

    if (result.rows.length === 0) {
      return notFoundResponse(res, 'User not found');
    }
    return successResponse(res, 'User updated successfully', result.rows[0]);
  } catch (error) {
    console.error('Error updating user:', error.message);
    return errorResponse(res, 'Error updating user', error.message);
  }
};

// 📌 Delete User
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return notFoundResponse(res, 'User not found');
    }
    return successResponse(res, 'User deleted successfully', result.rows[0]);
  } catch (error) {
    console.error('Error deleting user:', error.message);
    return errorResponse(res, 'Error deleting user', error.message);
  }
};

