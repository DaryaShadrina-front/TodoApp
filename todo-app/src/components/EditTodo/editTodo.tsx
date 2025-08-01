import {
    Button,
    Dialog,
    For,
    HStack,
    Portal,
    CloseButton,
    Textarea,
} from "@chakra-ui/react";
import { useState, type FC, useEffect, useRef } from "react";

interface EditTaskProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onSave: (newText: string) => void;
}

export const EditTask: FC<EditTaskProps> = ({ isOpen, onClose, text, onSave }) => {
    const [inputValue, setInputValue] = useState(text);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus();
                textareaRef.current?.setSelectionRange(inputValue.length, inputValue.length);
            }, 100);
        }
    }, [isOpen, inputValue]);

    const handleSave = () => {
        onSave(inputValue);
        onClose();
    };

    return (
        <HStack wrap="wrap" gap="4">
            <For each={["center"]}>
                {(placement) => (
                    <Dialog.Root
                        key={placement}
                        open={isOpen}
                        onOpenChange={onClose}
                        placement={placement}
                        motionPreset="slide-in-bottom"
                    >
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content>
                                    <Dialog.Header justifyContent={"space-between"}>
                                        <Dialog.Title>Edit Task</Dialog.Title>
                                        <CloseButton onClick={onClose} />
                                    </Dialog.Header>
                                    <Dialog.Body>
                                        <Textarea
                                            colorPalette='teal'
                                            ref={textareaRef}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="Edit task"
                                        />
                                    </Dialog.Body>
                                    <Dialog.Footer>
                                        <Dialog.ActionTrigger asChild>
                                            <Button variant="outline" onClick={onClose}>
                                                Cancel
                                            </Button>
                                        </Dialog.ActionTrigger>
                                        <Button onClick={handleSave} bg='teal.600' variant="outline">Save</Button>
                                    </Dialog.Footer>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                )}
            </For>
        </HStack>
    );
};
