
import express from 'express';
import { 
  getAllFeedback, 
  getFeedbackById, 
  createFeedback, 
  updateFeedback, 
  deleteFeedback,
  getFeedbackByInterviewId 
} from '../controllers/feedbackController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Public routes (for authenticated users)
router.get('/', getAllFeedback);
router.get('/:id', getFeedbackById);
router.get('/interview/:interviewId', getFeedbackByInterviewId);

// Protected routes
router.post('/', authorize(['admin', 'interviewer']), createFeedback);
router.put('/:id', authorize(['admin', 'interviewer']), updateFeedback);
router.delete('/:id', authorize(['admin']), deleteFeedback);

export default router;
