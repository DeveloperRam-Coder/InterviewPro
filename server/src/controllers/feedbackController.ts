
import { Request, Response } from 'express';
import prisma from '../services/prismaService';

// Get all feedback
export const getAllFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await prisma.feedback.findMany({
      orderBy: { submittedAt: 'desc' }
    });
    
    return res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch feedback' });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const feedback = await prisma.feedback.findUnique({
      where: { id }
    });
    
    if (!feedback) {
      return res.status(404).json({ error: 'Not Found', message: 'Feedback not found' });
    }
    
    return res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch feedback' });
  }
};

// Create new feedback
export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { 
      interviewId, evaluatorId, evaluatorName, overallRating, 
      recommendation, strengths, weaknesses, notes 
    } = req.body;
    
    if (!interviewId || !evaluatorId || !evaluatorName || !overallRating || !recommendation) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Missing required fields' 
      });
    }
    
    // Verify the interview exists
    const interview = await prisma.interview.findUnique({
      where: { id: interviewId }
    });
    
    if (!interview) {
      return res.status(404).json({ 
        error: 'Not Found', 
        message: 'Interview not found' 
      });
    }
    
    const newFeedback = await prisma.feedback.create({
      data: {
        interviewId,
        evaluatorId,
        evaluatorName,
        overallRating,
        recommendation,
        strengths: strengths || '',
        weaknesses,
        notes,
        submittedAt: new Date().toISOString()
      }
    });
    
    // Update the interview status if needed
    await prisma.interview.update({
      where: { id: interviewId },
      data: { status: 'Completed' }
    });
    
    return res.status(201).json(newFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create feedback' });
  }
};

// Update feedback
export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      overallRating, recommendation, strengths, weaknesses, notes 
    } = req.body;
    
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id }
    });
    
    if (!existingFeedback) {
      return res.status(404).json({ error: 'Not Found', message: 'Feedback not found' });
    }
    
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: {
        overallRating,
        recommendation,
        strengths,
        weaknesses,
        notes
      }
    });
    
    return res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update feedback' });
  }
};

// Delete feedback
export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id }
    });
    
    if (!existingFeedback) {
      return res.status(404).json({ error: 'Not Found', message: 'Feedback not found' });
    }
    
    await prisma.feedback.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete feedback' });
  }
};

// Get feedback by interview ID
export const getFeedbackByInterviewId = async (req: Request, res: Response) => {
  try {
    const { interviewId } = req.params;
    
    const feedback = await prisma.feedback.findMany({
      where: { interviewId },
      orderBy: { submittedAt: 'desc' }
    });
    
    return res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching interview feedback:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch interview feedback' });
  }
};
