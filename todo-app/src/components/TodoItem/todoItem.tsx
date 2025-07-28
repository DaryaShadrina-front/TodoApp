import { Checkbox, Flex, IconButton, Text } from "@chakra-ui/react";
import type { FC } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface TaskItemProps {
    task: { id: string; text: string, completed: boolean};
    onEdit: (id: string, newText: string) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
}
export const TaskItem: FC<TaskItemProps> = ({ task, onEdit, onDelete, onToggleComplete }) => {
    return (
        <Flex justify="space-between" align="center" p={4} borderWidth={1} borderRadius="md" mb={2}>
            <Flex align="center">
                <Checkbox.Root
                    checked={task.completed} 
                    onChange={() => onToggleComplete(task.id)} 
                    mr={4}
                    colorPalette={"teal"}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
                <Text as={task.completed ? "s" : "span"}>{task.text}</Text>
            </Flex>
            <Flex>
                <IconButton
                    onClick={() => onEdit(task.id, task.text)}
                    aria-label="Edit Task"
                    bg='teal.600'
                    variant="outline"
                    mr={2}
                >
                    <MdModeEdit />
                </IconButton>
                <IconButton
                    onClick={() => onDelete(task.id)}
                    aria-label="Delete Task"
                    bg='teal.600'
                    variant="outline"
                >
                    <MdDelete />
                </IconButton>
            </Flex>
        </Flex>
    );
};