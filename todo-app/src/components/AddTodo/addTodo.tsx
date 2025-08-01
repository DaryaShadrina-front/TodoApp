import {
    Flex,
    Input,
    Button,
    Alert
} from "@chakra-ui/react"
import { useCallback, useState, type FC } from "react";

interface InputPlusProps {
    onAdd: (text: string) => void;
}

export const InputPlus: FC<InputPlusProps> = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const addTask = useCallback(() => {
        if (inputValue.trim() === '') {
            setErrorMessage('The field cannot be empty');
            return;
        }
        onAdd(inputValue);
        setInputValue('');
        setErrorMessage('');
    }, [inputValue, onAdd]);
    
    return(
        <form> 
            <Flex mt='2%' mb={5}>
                <Input 
                    value={inputValue}
                    onChange={(evt) => {
                        setInputValue(evt.target.value);
                        setErrorMessage('');
                    }}
                    onKeyDown={(evt) => {
                        if (evt.key === 'Enter') {
                            addTask();
                        }
                    }}
                    variant='flushed' 
                    placeholder='Add task' 
                    w='100%' 
                />
                <Button onClick={addTask} ml={5} bg='teal.600' variant="outline">Add Task</Button>
            </Flex>
            {errorMessage && (
                <Alert.Root status="error">
                    <Alert.Indicator />
                    <Alert.Title>{errorMessage}</Alert.Title>
                </Alert.Root>
            )}
        </form>
    )
}

export default InputPlus