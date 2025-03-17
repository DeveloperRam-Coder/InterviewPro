
import { Request, Response } from 'express';
import prisma from '../services/prismaService';

// Get all interviews
export const getAllInterviews = async (req: Request, res: Response) => {
  try {
    const interviews = await prisma.interview.findMany({
      orderBy: { date: 'desc' }
    });
    
    return res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching interviews:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch interviews' });
  }
};

// Get interview by ID
export const getInterviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const interview = await prisma.interview.findUnique({
      where: { id },
      include: {
        feedback: true
      }
    });
    
    if (!interview) {
      return res.status(404).json({ error: 'Not Found', message: 'Interview not found' });
    }
    
    return res.status(200).json(interview);
  } catch (error) {
    console.error('Error fetching interview:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch interview' });
  }
};

// Create a new interview
export const createInterview = async (req: Request, res: Response) => {
  try {
    const { 
      candidateId, candidateName, position, type, status, 
      date, startTime, endTime, interviewers, location, videoLink, notes, timeZone 
    } = req.body;
    
    if (!candidateId || !candidateName || !position || !type || !status || !date || !startTime || !endTime || !interviewers) {
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
    
    const newInterview = await prisma.interview.create({
      data: {
        candidateId,
        candidateName,
        position,
        type,
        status,
        date,
        startTime,
        endTime,
        interviewers,
        location,
        videoLink,
        notes,
        timeZone
      }
    });
    
    return res.status(201).json(newInterview);
  } catch (error) {
    console.error('Error creating interview:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create interview' });
  }
};

// Update an interview
export const updateInterview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      candidateId, candidateName, position, type, status, 
      date, startTime, endTime, interviewers, location, videoLink, notes, timeZone 
    } = req.body;
    
    const existingInterview = await prisma.interview.findUnique({
      where: { id }
    });
    
    if (!existingInterview) {
      return res.status(404).json({ error: 'Not Found', message: 'Interview not found' });
    }
    
    const updatedInterview = await prisma.interview.update({
      where: { id },
      data: {
        candidateId,
        candidateName,
        position,
        type,
        status,
        date,
        startTime,
        endTime,
        interviewers,
        location,
        videoLink,
        notes,
        timeZone
      }
    });
    
    return res.status(200).json(updatedInterview);
  } catch (error) {
    console.error('Error updating interview:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update interview' });
  }
};

// Delete an interview
export const deleteInterview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingInterview = await prisma.interview.findUnique({
      where: { id }
    });
    
    if (!existingInterview) {
      return res.status(404).json({ error: 'Not Found', message: 'Interview not found' });
    }
    
    await prisma.interview.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting interview:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete interview' });
  }
};

// Get interviews by candidate ID
export const getInterviewsByCandidateId = async (req: Request, res: Response) => {
  try {
    const { candidateId } = req.params;
    
    const interviews = await prisma.interview.findMany({
      where: { candidateId },
      orderBy: { date: 'desc' }
    });
    
    return res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching candidate interviews:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch candidate interviews' });
  }
};
