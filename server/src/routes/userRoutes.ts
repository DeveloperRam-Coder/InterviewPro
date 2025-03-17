
import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser,
  changePassword 
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Admin-only routes
router.get('/', authorize(['admin']), getAllUsers);
router.post('/', authorize(['admin']), createUser);
router.delete('/:id', authorize(['admin']), deleteUser);

// User-specific routes (a user can view and update their own profile)
router.get('/:id', (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden', message: 'You can only access your own profile' });
  }
}, getUserById);

router.put('/:id', (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden', message: 'You can only update your own profile' });
  }
}, updateUser);

router.post('/:id/change-password', (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden', message: 'You can only change your own password' });
  }
}, changePassword);

export default router;
