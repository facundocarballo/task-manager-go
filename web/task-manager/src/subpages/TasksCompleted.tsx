import { HStack, Heading, Spacer, VStack, Box, Text, Button, useDisclosure } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import { useProvider } from '../context';
import { getAllTaskCompleted, getTaskFilterByAccomplishTime, getTaskFilterByCategory } from '../handlers/task';
import { getStringDate } from '../handlers/date';
import { FilterItem } from '../components/FilterItem';
import { getCategoryIdFromName } from '../handlers/categories';

export const TasksCompleted = () => {
    // Attributes
    const [accomplishTime, setAccomplishTime] = React.useState<string>('Default');
    const [categoryName, setCategoryName] = React.useState<string>('Default');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef(null);

    // Context
    const { categories, tasksCompleted, setTasksCompleted } = useProvider();
    // Methods
    const showCorrectIcon = (timeExpected: number | undefined, timeReal: number | undefined) => {
        if (timeReal == undefined) return <Text>🚫</Text>
        if (timeExpected == undefined) return <Text>✅</Text>
        if (timeReal > timeExpected) return <Text>🚫</Text>
        return <Text>✅</Text>
    }
    const getCategoryName = (id: number): string => {
        if (categories == null) return "Don't found category with that id";
        return categories[id].title
    }
    const getCategories = (): string[] => {
        if (categories == null) return [];
        const categoriesName: string[] = ['Default'];
        for (const cat of categories) {
            categoriesName.push(cat.title)
        }
        return categoriesName;
    }
    const filterData = () => {
        if (categories == null) return;
        const allTasksCompleted = getAllTaskCompleted(categories);
        const tasksFilterByAccomplishTime = getTaskFilterByAccomplishTime(allTasksCompleted, accomplishTime);
        const categoryId = getCategoryIdFromName(categoryName, categories);
        if (categoryId == null) {
            onClose();
            setTasksCompleted(tasksFilterByAccomplishTime);
            return;
        }
        const tasksFilterByCategory = getTaskFilterByCategory(tasksFilterByAccomplishTime, categoryId);
        onClose();
        setTasksCompleted(tasksFilterByCategory);
        return;
    };

    // Component
    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Filter Tasks Completed
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            <FilterItem
                                title='Accomplish Time'
                                options={['Default', '✅ YES', '🚫 NO']}
                                selected={accomplishTime}
                                setSelected={setAccomplishTime}
                            />
                            <FilterItem
                                title='Category'
                                options={getCategories()}
                                selected={categoryName}
                                setSelected={setCategoryName}
                            />
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button variant='primary' onClick={filterData}>
                                FILTER
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <VStack w='full'>
                <HStack w='full'>
                    <Box w='10px' />
                    <Heading>{tasksCompleted.length} Task{tasksCompleted.length > 1 ? 's' : null} Completed</Heading>
                    <Spacer />
                    <Button variant='secundary' onClick={onOpen}>
                        FILTER
                    </Button>
                    <Box w='10px' />
                </HStack>
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>Task Title</Th>
                                <Th>Date Created</Th>
                                <Th>Date Ended</Th>
                                <Th>Accomplish Time</Th>
                                <Th>Category</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                tasksCompleted.map((task) => (
                                    <Tr>
                                        <Td>{task.title}</Td>
                                        <Td>{getStringDate(task.dateCreated)}</Td>
                                        <Td>{getStringDate(task.dateEnded)}</Td>
                                        <Td>{showCorrectIcon(task.dateMustEnd?.getTime(), task.dateEnded?.getTime())}</Td>
                                        <Td>{getCategoryName(task.category_id)}</Td>
                                    </Tr>
                                )
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </>
    );
}