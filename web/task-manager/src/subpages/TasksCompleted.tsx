import { HStack, Heading, Spacer, VStack, Box, Text } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import React from 'react';
import { useProvider } from '../context';
import { getAllTaskCompleted, sortTaskByDate } from '../handlers/task';
import { ITask } from '../components/Task';
import { getStringDate } from '../handlers/date';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

export const TasksCompleted = () => {
    // Attributes
    // Context
    const { categories, setCategories } = useProvider();
    // Methods
    const getRows = (): ITask[] => {
        if (categories == null) return [];
        const tasksCompleted = getAllTaskCompleted(categories);
        return sortTaskByDate(tasksCompleted);
    }
    const showCorrectIcon = (timeExpected: number|undefined, timeReal: number|undefined) => {
        if (timeReal == undefined) return <CloseIcon color='red' />
        if (timeExpected == undefined) return <CheckIcon color='green' />
        if (timeReal > timeExpected) return <CloseIcon color='red' />
        return <CheckIcon color='green' />
    }
    const getCategoryName = (id: number): string => {
        if (categories == null) return "Don't found category with that id";
        return categories[id].title
    }
    // Component
    return (
        <>
            <VStack w='full'>
                <HStack w='full'>
                    <Box w='10px' />
                    <Heading>Tasks Completed</Heading>
                    <Spacer />
                </HStack>
                <Text>Filtros</Text>
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
                                getRows().map((task) => (
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