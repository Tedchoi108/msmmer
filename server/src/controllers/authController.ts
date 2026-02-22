import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password, name, role, companyName, businessNumber, businessRegistrationUrl, categories } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role,
                companyName,
                businessNumber,
                businessRegistrationUrl,
                categories: categories || [],
                isVerified: role === 'FACTORY' ? false : true, // Factories need verification
            },
        });

        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        if (!user.password) {
            return res.status(400).json({ message: 'Please use SNS login for this account' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const socialLogin = async (req: Request, res: Response) => {
    try {
        const { email, name, provider, providerId } = req.body;

        // 1. Check if user already exists with this providerId
        let user = await prisma.user.findUnique({ where: { providerId } });

        // 2. If not, create a new user (Minimized personal data)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    email, // Needed for communication
                    name,
                    provider,
                    providerId,
                    role: 'CLIENT', // Default role
                    // password remains null for social users
                }
            });
        }

        // 3. Generate JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            message: 'Social login successful'
        });
    } catch (error) {
        console.error('Social login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
