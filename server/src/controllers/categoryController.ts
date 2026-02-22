import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const submitCategoryRequest = async (req: AuthRequest, res: Response) => {
    try {
        const { requestedCategories, reason } = req.body;
        const userId = req.user?.userId;

        if (!userId) return res.status(401).json({ message: 'Unauthorized' });

        const request = await prisma.categoryRequest.create({
            data: {
                userId,
                requestedCategories,
                reason,
                status: 'PENDING',
            },
        });

        res.status(201).json({ message: 'Category modification request submitted', request });
    } catch (error) {
        console.error('Category request error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMyCategoryRequests = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const requests = await prisma.categoryRequest.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Admin Only
export const approveCategoryRequest = async (req: AuthRequest, res: Response) => {
    try {
        const { requestId } = req.params;
        const { status, adminNote } = req.body; // APPROVED or REJECTED

        const categoryRequest = await prisma.categoryRequest.findUnique({
            where: { id: requestId },
        });

        if (!categoryRequest) return res.status(404).json({ message: 'Request not found' });

        await prisma.$transaction([
            prisma.categoryRequest.update({
                where: { id: requestId },
                data: { status, adminNote },
            }),
            ...(status === 'APPROVED' ? [
                prisma.user.update({
                    where: { id: categoryRequest.userId },
                    data: { categories: categoryRequest.requestedCategories },
                })
            ] : [])
        ]);

        res.json({ message: `Request ${status.toLowerCase()} successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
