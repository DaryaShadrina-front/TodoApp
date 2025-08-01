import { Button, Flex, Heading, Menu, Portal } from "@chakra-ui/react"
import { ColorModeToggle } from "./color-mode-toggle"
import { useTheme } from "next-themes";


const Header = () => {
    const { theme } = useTheme();

    return (
        <Flex 
            as="header"
            align="center"
            justify="space-between"
            p={4}
            boxShadow="md"
            position="fixed"
            top={0}
            left={0}
            right={0}
            zIndex="sticky"
            bg={theme === 'light' ? 'white' : 'teal'}
        >
            <ColorModeToggle />
            <Heading 
                fontWeight="800"
                size="5xl"
            >
                To do list
            </Heading>
            <Menu.Root>
                <Menu.Trigger asChild>
                    <Button variant="outline" size="sm" bg='teal.600'>
                        Sign in
                    </Button>
                </Menu.Trigger>
                <Portal>
                    <Menu.Positioner>
                        <Menu.Content>
                            <Menu.Item value="sign-in">Sign in</Menu.Item>
                            <Menu.Item value="sign-up">Sign up</Menu.Item>
                        </Menu.Content>
                    </Menu.Positioner>
                </Portal>
            </Menu.Root>
        </Flex>
    )
};

export default Header;
