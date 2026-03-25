import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { SquarePen } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Tasks } from "@/src/generated/prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { updateTask } from "@/src/actions/edit-task";
import { DialogClose } from "./ui/dialog";

type EditTaskProps = {
    task: Tasks,
    handleGetTasks: () => Promise<void>
}

const EditTask = ({ task, handleGetTasks }: EditTaskProps) => {
    const [editedTask, setEditedTask] = useState(task.task);

    const handleEditTask = async () => {
        try {
            if (editedTask !== task.task) {
                await updateTask(task.id, editedTask);
                toast.success("Task updated successfully");
                await handleGetTasks();
            } else {
                toast.error("Error updating task");
                return
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <SquarePen size={16} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex justify-between items-center gap-2">
                    <Input
                        placeholder="Edit Task"
                        value={editedTask}
                        onChange={(e) => setEditedTask(e.target.value)}
                    />

                    <DialogClose asChild>
                        <Button
                            variant="default"
                            className="cursor-pointer"
                            onClick={handleEditTask}
                        > Edit</Button>
                    </DialogClose>

                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default EditTask
