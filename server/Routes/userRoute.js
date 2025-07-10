import express from 'express';
const router=express.Router();
import UserController from '../controllers/user.js';

router.post('/register' ,UserController.register);
router.post('/login', UserController.login);
router.get('/profile/:id', UserController.getProfile);
export default router;