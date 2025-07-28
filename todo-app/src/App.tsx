import {
  Flex,
  Text,
  Box,
  ClientOnly,
  Skeleton,
} from "@chakra-ui/react"
import { ColorModeToggle } from "./components/ui/color-mode-toggle"
import InputPlus from "./components/AddTodo/addTodo"
import { useDispatch, useSelector } from "react-redux";
import { createTask, removeTask, updateTask } from './utils/todoSlice';
import { useState, type FC } from "react";
import type { RootState } from "./utils/appState";
import { TaskItem } from "./components/TodoItem/todoItem";
import { EditTask } from "./components/EditTodo/editTodo";
import { TaskFilterSort } from "./components/TodoList/TaskFilterSort";

export const App: FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [currentTaskText, setCurrentTaskText] = useState('');
  const [filter, setFilter] = useState<string[]>(['all']);
  const [sortOrder, setSortOrder] = useState<string[]>(['newest']);
  
  const addTask = (text: string) => {
    if (text.trim()) {
      dispatch(createTask(text));
    }
  };
  const handleEdit = (id: string, text: string) => {
        setCurrentTaskId(id);
        setCurrentTaskText(text);
        setIsEditing(true);
  };
  const handleDelete = (id: string) => {
        dispatch(removeTask(id));
  };
  const handleSave = (newText: string) => {
        if (currentTaskId) {
            dispatch(updateTask({
              id: currentTaskId, text: newText,
              completed: false
            }));
        }
  };
  const handleToggleComplete = (id: string, currentCompleted: boolean) => {
      dispatch(updateTask({ id, completed: !currentCompleted }));
  };
  const filteredTasks = tasks.filter(task => {
    if (filter[0] === 'completed') return task.completed;
    if (filter[0] === 'incomplete') return !task.completed;
    return true;
  });
  const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder[0] === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
  });
  
  return (
    <Box textAlign="left" fontSize="xl" pt="15vh">
      <Flex w='100%' h='100vh'>
        <Flex w='100%' flexDir='column' ml='20%' mt='5%' mr='20%'>
          <Text fontWeight='700' fontSize={30} mb={4}>Tasks</Text>
          <InputPlus onAdd={addTask}/>
          <TaskFilterSort
            filter={filter} 
            setFilter={setFilter} 
            sortOrder={sortOrder} 
            setSortOrder={setSortOrder} 
          />
          {sortedTasks.map(task => (
              <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleComplete={() => handleToggleComplete(task.id, task.completed)}
              />
          ))}
        </Flex>
      </Flex>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>

      <EditTask
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        text={currentTaskText}
        onSave={handleSave}
      />
    </Box>
  )
}

export default App