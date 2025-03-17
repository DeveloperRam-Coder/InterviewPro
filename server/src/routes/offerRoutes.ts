
import express from 'express';
import { 
  getAllOffers, 
  getOfferById, 
  createOffer, 
  updateOffer, 
  deleteOffer,
  getOffersByCandidateId 
} from '../controllers/offerController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Public routes (for authenticated users)
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.get('/candidate/:candidateId', getOffersByCandidateId);

// Protected routes
router.post('/', authorize(['admin']), createOffer);
router.put('/:id', authorize(['admin']), updateOffer);
router.delete('/:id', authorize(['admin']), deleteOffer);

export default router;
