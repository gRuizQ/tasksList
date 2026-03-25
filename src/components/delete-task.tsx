import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog"
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog"
import { Trash } from "lucide-react"

const DeleteTask = ({ onDelete }: { onDelete: () => void | Promise<void> }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash size={16} className="cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this item?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTask
