
import { Request, Response } from 'express';
import prisma from '../services/prismaService';

// Get all offers
export const getAllOffers = async (req: Request, res: Response) => {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch offers' });
  }
};

// Get offer by ID
export const getOfferById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const offer = await prisma.offer.findUnique({
      where: { id }
    });
    
    if (!offer) {
      return res.status(404).json({ error: 'Not Found', message: 'Offer not found' });
    }
    
    return res.status(200).json(offer);
  } catch (error) {
    console.error('Error fetching offer:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch offer' });
  }
};

// Create new offer
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { 
      candidateId, candidateName, position, department, status, 
      salary, startDate, expirationDate, notes 
    } = req.body;
    
    if (!candidateId || !candidateName || !position || !department || !status || !salary || !expirationDate) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Missing required fields' 
      });
    }
    
    // Verify the candidate exists
    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId }
    });
    
    if (!candidate) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Candidate not found' 
      });
    }
    
    const newOffer = await prisma.offer.create({
      data: {
        candidateId,
        candidateName,
        position,
        department,
        status,
        salary,
        startDate,
        expirationDate,
        notes
      }
    });
    
    // Update candidate status if needed
    if (candidate.status !== 'Offer') {
      await prisma.candidate.update({
        where: { id: candidateId },
        data: { status: 'Offer' }
      });
    }
    
    return res.status(201).json(newOffer);
  } catch (error) {
    console.error('Error creating offer:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create offer' });
  }
};

// Update offer
export const updateOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      status, salary, startDate, expirationDate, notes 
    } = req.body;
    
    const existingOffer = await prisma.offer.findUnique({
      where: { id }
    });
    
    if (!existingOffer) {
      return res.status(404).json({ error: 'Not Found', message: 'Offer not found' });
    }
    
    const updatedOffer = await prisma.offer.update({
      where: { id },
      data: {
        status,
        salary,
        startDate,
        expirationDate,
        notes
      }
    });
    
    // If offer is accepted, update candidate status
    if (status === 'Accepted' && existingOffer.status !== 'Accepted') {
      await prisma.candidate.update({
        where: { id: existingOffer.candidateId },
        data: { status: 'Hired' }
      });
    }
    
    return res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update offer' });
  }
};

// Delete offer
export const deleteOffer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingOffer = await prisma.offer.findUnique({
      where: { id }
    });
    
    if (!existingOffer) {
      return res.status(404).json({ error: 'Not Found', message: 'Offer not found' });
    }
    
    await prisma.offer.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting offer:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete offer' });
  }
};

// Get offers by candidate ID
export const getOffersByCandidateId = async (req: Request, res: Response) => {
  try {
    const { candidateId } = req.params;
    
    const offers = await prisma.offer.findMany({
      where: { candidateId },
      orderBy: { createdAt: 'desc' }
    });
    
    return res.status(200).json(offers);
  } catch (error) {
    console.error('Error fetching candidate offers:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch candidate offers' });
  }
};
