
import express from 'express';
import { 
  getAllCandidates, 
  getCandidateById, 
  createCandidate, 
  updateCandidate, 
  deleteCandidate 
} from '../controllers/candidateController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticate);

// Public routes (authenticated users, but no specific role required)
router.get('/', getAllCandidates);
router.get('/:id', getCandidateById);

// Protected routes (only admin and HR can modify data)
router.post('/', authorize(['admin']), createCandidate);
router.put('/:id', authorize(['admin']), updateCandidate);
router.delete('/:id', authorize(['admin']), deleteCandidate);

export default router;
