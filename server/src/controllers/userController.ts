
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../services/prismaService';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        department: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch users' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        department: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch user' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role, department } = req.body;
    
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Missing required fields' 
      });
    }
    
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({ 
        error: 'Conflict', 
        message: 'A user with this email already exists' 
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        department,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        department: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create user' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role, department, isActive, avatar } = req.body;
    
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        role,
        department,
        isActive,
        avatar
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        avatar: true,
        department: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update user' });
  }
};

// Change user password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Current password and new password are required' 
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' });
    }
    
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Current password is incorrect' });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword }
    });
    
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to change password' });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return res.status(404).json({ error: 'Not Found', message: 'User not found' });
    }
    
    await prisma.user.delete({
      where: { id }
    });
    
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete user' });
  }
};
