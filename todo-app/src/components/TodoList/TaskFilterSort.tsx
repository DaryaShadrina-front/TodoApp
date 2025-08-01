import { createListCollection, Flex, Portal, Select,  } from "@chakra-ui/react";
import { type FC } from "react";
import type { FilterType } from "../../hooks/useTodo";

interface TaskFilterSortProps {
    filter: string[];
    setFilter: (filter: FilterType[]) => void;
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
                    const value = details.value as FilterType[];
                    setFilter(value);
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
        { label: "Unfulfilled", value: "active" },
    ],
})

const options = createListCollection({
    items: [
        { label: "New ones first", value: "newest" },
        { label: "The old ones first", value: "oldest" },
    ],
})
