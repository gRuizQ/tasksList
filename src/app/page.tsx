"use client"
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, ListCheck, Sigma, LoaderCircle } from 'lucide-react';
import { Tasks } from "@/src/generated/prisma/client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

import EditTask from "@/src/components/edit-task";
import ClearTask from "@/src/components/clear-task";
import DeleteTask from "@/src/components/delete-task";
import Filter, { FilterType } from "@/src/components/filter";

import { getTasks } from "@/src/lib/actions/get-tasks-from-bd";
import { NewTask } from "@/src/lib/actions/add-task";
import { deleteTask } from "@/src/lib/actions/delete-task";
import { updateTaskDone } from "@/src/lib/actions/toggle-done";
import { ClearCompletedTask } from "@/src/lib/actions/clear-completed-tasks";


const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([]);
  const [task, setTask] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([]);

  const handleGetTasks = async () => {
    try {
      const tasks = await getTasks();
      if (!tasks) return;
      setTaskList(tasks);
    } catch (error) {
      throw error;
    }
  }

  const handleAddTask = async () => {
    setIsLoading(true);
    try {
      if (!task || task.length === 0) {
        toast.error("Enter a task");
        return;
      }
      const newTask = await NewTask(task);

      if (!newTask) return;
      await handleGetTasks();
      setTask('');
      toast.success("Task added successfully");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return;
      const deleted = await deleteTask(id);

      if (!deleted) return;
      await handleGetTasks();
      toast.warning("Task deleted successfully");
    } catch (error) {
      throw error;
    }
  }

  const handleToggleTask = async (id: string) => {
    const previousTask = [...taskList];

    try {
      setTaskList((prev) => {
        const updateTaskList = prev.map(task => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done
            }
          } else return task;
        });
        return updateTaskList;
      });

      const updatedTask = await updateTaskDone(id);
      if (!updatedTask) return;
      toast.success("Task updated successfully");
    } catch (error) {
      setTaskList(previousTask);
      throw error;
    }
  }

  const handleClearCompletedTasks = async () => {
    try {
      const clearedTasks = await ClearCompletedTask();

      if (!clearedTasks) return;
      setTaskList(clearedTasks);

      await handleGetTasks();
      toast.success("Completed tasks cleared successfully");
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    handleGetTasks();
  }, []);

  useEffect(() => {
    switch (currentFilter) {
      case 'all':
        setFilteredTasks(taskList);
        break;
      case 'pending':
        setFilteredTasks(taskList.filter(task => !task.done));
        break;
      case 'completed':
        setFilteredTasks(taskList.filter(task => task.done));
        break;
    }
  }, [currentFilter, taskList]);

  return (
    <main className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <Card className="w-lg p-4">
        <CardHeader className="flex gap-2">
          <Input placeholder="Add Task" onChange={(e) => setTask(e.target.value)} value={task} />
          <Button variant="default" className="cursor-pointer" onClick={handleAddTask}>
            <Plus />
            {isLoading ? <LoaderCircle className="animate-spin" /> : null}
            Register</Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <Filter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

          <div className="mt-4 border-b-1">

            {taskList.length === 0 ? (
              <p className="text-center text-xs border-t-1 py-4">No tasks available</p>
            ) : null}

            {filteredTasks.map((task) => (
              <div className="h-14 flex justify-between items-center border-t-1" key={task.id}>
                <div className={task.done ? 'w-1 h-full bg-green-400' : 'w-1 h-full bg-red-400'}></div>
                <p className="flex-1 px-2 text-sm cursor-pointer hover:text-gray-700"
                  onClick={() => handleToggleTask(task.id)}
                >{task.task}</p>
                <div className="flex items-center gap-3">

                  <EditTask task={task} handleGetTasks={handleGetTasks} />
                  <DeleteTask onDelete={() => handleDeleteTask(task.id)} />

                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <ListCheck size={16} />
              <p className="text-xs">Completed tasks ({taskList.filter(task => task.done).length}/{taskList.length})</p>
            </div>

            <ClearTask onClear={handleClearCompletedTasks} taskList={taskList} />

          </div>

          <div className="h-2 w-full bg-gray-100 mt-4 rounded-md">
            <div
              className="h-full bg-blue-500 rounded-md"
              style={{ 
                width: `${(taskList.filter(task => task.done).length / taskList.length) * 100}%` 
              }}>
            </div>
          </div>

          <div className="flex justify-end items-center mt-2 gap-1">
            <Sigma size={16} />
            <p className="text-xs"> {taskList.length} Total tasks</p>
          </div>


        </CardContent>

        <div></div>

      </Card>
    </main>
  );
};

export default Home;
