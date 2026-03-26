"use server";

import { prisma } from "@/src/lib/utils/prisma";

export const updateTask = async (id: string, task: string) => {
    try {
        if(!id || !task) return;
        const updatedTask = await prisma.tasks.update({
            where: { id: id },
            data: { task: task }
        });

        if(!updatedTask) return;
        console.log(updatedTask);
        return updatedTask;
    } catch (error) {
        throw error;
    }
}


