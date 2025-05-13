import express from 'express';
import {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controller/userController.js'; 

const router = express.Router();

// Routes
router.post('/create', createUser); 
router.post('/login',loginUser)        // ➡️ Create User
router.get('/', getAllUsers);               // ➡️ Get All Users
router.get('/:id', getUserById);            // ➡️ Get User by ID
router.put('/update/:id', updateUser);      // ➡️ Update User
router.delete('/delete/:id', deleteUser);   // ➡️ Delete User

export default router;
