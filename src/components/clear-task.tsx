import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { Trash } from "lucide-react"
import { Button } from "./ui/button"
import { Tasks } from "@/src/generated/prisma/client";

type ClearTaskProps = {
    onClear: () => Promise<void>;
    taskList: Tasks[];
}

const ClearTask = ({ onClear, taskList }: ClearTaskProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-xs h-7 cursor-pointer">
                    <Trash size={16} /> Clear completed tasks
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete {taskList.filter(task => task.done).length} items?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="cursor-pointer" onClick={() => onClear()}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ClearTask
