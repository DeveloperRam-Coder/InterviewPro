
import { Request, Response } from 'express';
import prisma from '../services/prismaService';

// Get all candidates
export const getAllCandidates = async (req: Request, res: Response) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        skills: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch candidates' });
  }
};

// Get candidate by ID
export const getCandidateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        skills: true,
        interviews: true,
        offers: true
      }
    });
    
    if (!candidate) {
      return res.status(404).json({ error: 'Not Found', message: 'Candidate not found' });
    }
    
    return res.status(200).json(candidate);
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch candidate' });
  }
};

// Create a new candidate
export const createCandidate = async (req: Request, res: Response) => {
  try {
    const { 
      firstName, lastName, email, phone, status, 
      position, department, source, appliedDate, skills 
    } = req.body;
    
    if (!firstName || !lastName || !email || !status || !position) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Missing required fields' 
      });
    }
    
    const existingCandidate = await prisma.candidate.findUnique({
      where: { email }
    });
    
    if (existingCandidate) {
      return res.status(409).json({ 
        error: 'Conflict', 
        message: 'A candidate with this email already exists' 
      });
    }
    
    // Process skills
    const skillsArray = Array.isArray(skills) ? skills : [];
    
    const newCandidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        status,
        position,
        department,
        source,
        appliedDate: appliedDate || new Date().toISOString().split('T')[0],
        skills: {
          create: skillsArray.map((skill: any) => ({
            name: skill.name,
            category: skill.category
          }))
        }
      },
      include: {
        skills: true
      }
    });
    
    return res.status(201).json(newCandidate);
  } catch (error) {
    console.error('Error creating candidate:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create candidate' });
  }
};

// Update a candidate
export const updateCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      firstName, lastName, email, phone, status, 
      position, department, source, appliedDate, skills 
    } = req.body;
    
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id },
      include: { skills: true }
    });
    
    if (!existingCandidate) {
      return res.status(404).json({ error: 'Not Found', message: 'Candidate not found' });
    }
    
    // Process skills - this is a simplistic approach, in reality you might want
    // to handle skills updates more carefully to avoid duplicates
    let skillsUpdate = {};
    if (skills && Array.isArray(skills)) {
      // Delete existing skills and create new ones
      await prisma.skill.deleteMany({
        where: {
          candidates: {
            some: {
              id
            }
          }
        }
      });
      
      skillsUpdate = {
        create: skills.map((skill: any) => ({
          name: skill.name,
          category: skill.category
        }))
      };
    }
    
    const updatedCandidate = await prisma.candidate.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        phone,
        status,
        position,
        department,
        source,
        appliedDate,
        skills: skillsUpdate
      },
      include: {
        skills: true
      }
    });
    
    return res.status(200).json(updatedCandidate);
  } catch (error) {
    console.error('Error updating candidate:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update candidate' });
  }
};

// Delete a candidate
export const deleteCandidate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingCandidate = await prisma.candidate.findUnique({
      where: { id }
    });
    
    if (!existingCandidate) {
      return res.status(404).json({ error: 'Not Found', message: 'Candidate not found' });
    }
    
    await prisma.candidate.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete candidate' });
  }
};
