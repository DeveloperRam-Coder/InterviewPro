
import express from 'express';
import { 
  getAllInterviews, 
  getInterviewById, 
  createInterview, 
  updateInterview, 
  deleteInterview,
  getInterviewsByCandidateId 
} from '../controllers/interviewController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Public routes (for authenticated users)
router.get('/', getAllInterviews);
router.get('/:id', getInterviewById);
router.get('/candidate/:candidateId', getInterviewsByCandidateId);

// Protected routes
router.post('/', authorize(['admin', 'interviewer']), createInterview);
router.put('/:id', authorize(['admin', 'interviewer']), updateInterview);
router.delete('/:id', authorize(['admin']), deleteInterview);

export default router;
