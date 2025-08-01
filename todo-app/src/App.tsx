import { Flex, Box } from "@chakra-ui/react"
import InputPlus from "./components/AddTodo/addTodo"
import { useState, type FC } from "react";
import { EditTask } from "./components/EditTodo/editTodo";
import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/header";
import { useTodo, type FilterType } from "./hooks/useTodo";

export const App: FC = () => {
  const { 
    tasks, 
    loading, 
    error, 
    totalPage, 
    total,
    addTask, 
    removeTask, 
    updateTask,
  } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: '', text: '' });
  const [filter, setFilter] = useState<FilterType[]>(['all']);
  const [sortOrder, setSortOrder] = useState<string[]>(['newest']);
  
  const handleEdit = (id: string, text: string) => {
      setCurrentTask({ id, text });
      setIsEditing(true);
  };

  const handleSave = (newText: string) => {
      if (currentTask.id) {
          updateTask({
            id: currentTask.id,
            text: newText,
            completed: false
          });
          setIsEditing(false);
      }
  };
  const handleToggleComplete = (id: string, currentCompleted: boolean) => {
      updateTask({ 
        id,
        text: tasks.find(t => t.id === id)?.text || '',  
        completed: !currentCompleted });
  };

  return (
    <Box minH="100vh">
      <Header />
      <Flex w='100%' h='100vh'>
        <Flex w='100%' flexDir='column' ml='20%' mt='10%' mr='20%'>
          <InputPlus onAdd={addTask}/>
          <TodoList
            tasks={tasks}
            filter={filter}
            setFilter={setFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            onEdit={handleEdit}
            onDelete={removeTask}
            onToggleComplete={handleToggleComplete}
            loading={loading}
            error={error}
            totalPage={totalPage}
            total={total}
          />
        </Flex>
      </Flex>
      <EditTask
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        text={currentTask.text}
        onSave={handleSave}
      />
    </Box>
  )
}

export default App