import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'
import { json } from "stream/consumers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = req.query
        if (!userId || typeof userId !== 'string') {
            throw new Error('Invalid Id')
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        const followerCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: userId
                }
            }
        })

        return res.status(200).json({...existingUser, followerCount})
    } catch (error) {
        return res.status(400).end()
    }
}