
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../services/prismaService';
import { generateToken } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Bad Request', message: 'Email and password are required' });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred during login' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, role } = req.body;
    
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ 
        error: 'Bad Request', 
        message: 'Email, password, first name, last name, and role are required' 
      });
    }
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
      return res.status(409).json({ error: 'Conflict', message: 'User with this email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}`
      }
    });
    
    const token = generateToken(newUser);
    
    return res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        avatar: newUser.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: 'An error occurred during registration' });
  }
};
