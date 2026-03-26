"use server";

import { prisma } from "@/src/lib/utils/prisma";

export const deleteTask = async (id: string) => {
  try {
    if (!id) return;
    const deleted = await prisma.tasks.delete({ where: { id: id } });

    if (!deleted) return;
    return deleted;
  } catch (error) {
    throw error;
  }
};
