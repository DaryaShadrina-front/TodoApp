import { createListCollection, Flex, Portal, Select,  } from "@chakra-ui/react";
import { type FC } from "react";

interface TaskFilterSortProps {
    filter: string[];
    setFilter: (filter: string[]) => void;
    sortOrder: string[];
    setSortOrder: (sortOrder: string[]) => void;
}
export const TaskFilterSort: FC<TaskFilterSortProps> = ({ filter, setFilter, sortOrder, setSortOrder }) => {
    return (
        <Flex justify="space-between" mb={4}>
            <Select.Root 
                collection={optionsСompl} 
                size="sm" 
                width="320px"
                value={filter}
                onValueChange={(details) => {
                    setFilter(details.value);
                }} 
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="All" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {optionsСompl.items.map((option) => (
                                <Select.Item item={option} key={option.value}>
                                    {option.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
            <Select.Root 
                collection={options}        
                size="sm" 
                width="320px"
                value={sortOrder} 
                onValueChange={(details) => {
                    setSortOrder(details.value);
                }}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="New ones first" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner >
                        <Select.Content >
                            {options.items.map((option) => (
                                <Select.Item item={option} key={option.value}>
                                    {option.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </Flex>
    );
};

const optionsСompl = createListCollection({
    items: [
        { label: "All", value: "all" },
        { label: "Сompleted", value: "completed" },
        { label: "Unfulfilled", value: "incomplete" },
    ],
})

const options = createListCollection({
    items: [
        { label: "New ones first", value: "newest" },
        { label: "The old ones first", value: "oldest" },
    ],
})
