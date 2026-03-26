"use server";

import { prisma } from "@/src/lib/utils/prisma";

export const updateTaskDone = async (id: string) => {
    try {
        if(!id) return;
        const task = await prisma.tasks.findUnique(
            { where: { id: id } 
        });
        
        if(!task) return;
        const updatedTask = await prisma.tasks.update({
            where: { id: id },
            data: {
                done: !task.done,
            }
        });

        if(!updatedTask) return;
        console.log(updatedTask);
        return updatedTask;
    } catch (error) {
        throw error;
    }
}
