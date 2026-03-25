"use server";

import { prisma } from "@/src/utils/prisma";

export const getTasks = async () => {
    try {
        const tasks = await prisma.tasks.findMany();

        if (!tasks) return;
        
        console.log(tasks);
        return tasks;
    } catch (error) {
        console.log(error);
    }
};
