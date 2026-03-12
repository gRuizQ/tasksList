import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Plus, List, ListPlus, Check, SquarePen, Trash, ListCheck, Sigma } from 'lucide-react';
import { Badge } from "@/src/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"


const Home = () => {
  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex gap-2">
          <Input placeholder="Add Task" />
          <Button variant="default" className="cursor-pointer"> <Plus /> Register</Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <div className="flex gap-2">
            <Badge className="cursor-pointer" variant="default"><ListPlus /> All</Badge>
            <Badge className="cursor-pointer" variant="outline"><List /> To-Do</Badge>
            <Badge className="cursor-pointer" variant="outline"><Check /> Finished</Badge>
          </div>

          <div className="mt-4 border-b-1">
            <div className="h-14 flex justify-between items-center border-t-1">
              <div className="w-1 h-full bg-green-300"></div>
              <p className="flex-1 px-2 text-sm">TEST</p>
              <div className="flex items-center gap-3">

                <Dialog>
                  <DialogTrigger asChild>
                    <SquarePen size={16} className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex justify-between items-center gap-2">
                      <Input placeholder="Edit Task" />
                      <Button variant="default" className="cursor-pointer"> Edit</Button>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>

                <Trash size={16} className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <ListCheck size={16} />
              <p className="text-xs">Completed tasks (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-xs h-7 cursor-pointer">
                  <Trash size={16} /> Clear completed tasks
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete X items?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div className="h-full bg-blue-500 rounded-md" style={{ width: '50%' }}></div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-1">
            <Sigma size={16} />
            <p className="text-xs">3 Total tasks</p>
          </div>


        </CardContent>

        <div></div>

      </Card>
    </main>
  );
};

export default Home;