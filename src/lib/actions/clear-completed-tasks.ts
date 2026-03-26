"use server"

import { prisma } from "@/src/lib/utils/prisma";

export const ClearCompletedTask = async () => {
    try {
        await prisma.tasks.deleteMany({
            where: { done: true }
        });

        const allTasks = await prisma.tasks.findMany();

        if(!allTasks) return;
        
        return allTasks;
    } catch (error) {
        throw error;
    }
}
