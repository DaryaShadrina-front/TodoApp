import { type FC } from 'react';
import { Alert, Box, Flex, Spinner } from '@chakra-ui/react';
import { TaskItem } from '../TodoItem/todoItem';
import { TaskFilterSort } from './TaskFilterSort';
import { type Task } from '../../store/todoSlice';
import PaginationComp from './PaginationComp';
import { useTodo, type FilterType } from '../../hooks/useTodo';

interface TodoListProps {
    tasks: Task[];
    filter: FilterType[];
    setFilter: (filter: FilterType[]) => void;
    sortOrder: string[];
    setSortOrder: (sortOrder: string[]) => void;
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string, currentCompleted: boolean) => void;
    loading?: boolean;
    error?: string | null;
    totalPage?: number;
    total?: number;
}

const TodoList: FC<TodoListProps> = ({
    tasks,
    filter,
    setFilter,
    sortOrder,
    setSortOrder,
    onEdit,
    onDelete,
    onToggleComplete,
    loading = false,
    error = null,
    totalPage = 1,
    total = 1,
}: TodoListProps) => {
    const { getTodos } = useTodo();

    if (loading) {
        return (
            <Box 
                transition="opacity 0.3s ease"
                opacity={loading ? 1 : 0}
                pointerEvents={loading ? 'auto' : 'none'}
            >
                <Alert.Root
                    status="info" 
                    colorPalette="teal"
                    title="Loading tasks"
                >
                    <Alert.Indicator>
                        <Spinner size="sm" />
                    </Alert.Indicator>
                    <Alert.Title>Loading tasks...</Alert.Title>
                </Alert.Root>
            </Box>
        );
    }
    if (error) {
        return (
            <Alert.Root status="error" mt={4}>
                <Alert.Indicator />
                <Alert.Title>{error}</Alert.Title>
            </Alert.Root>
        );
    }
    const filteredTasks = tasks.filter(task => {
        if (filter[0] === 'completed') return task.completed;
        if (filter[0] === 'active') return !task.completed;
        return true;
    });

    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortOrder[0] === 'newest') {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });

    const totalPages = Math.max(1, Math.ceil(total / 10));

    return (
        <Flex flexDir="column">
            <TaskFilterSort
                filter={filter}
                setFilter={setFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            {sortedTasks.length > 0 ? (
        <>
            {sortedTasks.map(task => (
                <TaskItem
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={() => onToggleComplete(task.id, task.completed)}
                />
            ))}
            
            <PaginationComp
                totalPage={totalPage}
                total={totalPages}
                onPageChange={(page) => getTodos({ 
                page, 
                limit: 10, 
                filter: filter[0] 
                })}
            />
        </>
            ) : (
                <Alert.Root status="warning">
                    <Alert.Indicator />
                    <Alert.Title>
                        No tasks found. Create your first task!
                    </Alert.Title>
                </Alert.Root>
            )}
        </Flex>
    );
};

export default TodoList;