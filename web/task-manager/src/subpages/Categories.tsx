import { Box, Button, HStack, Heading, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../components/Category';
import { ITask } from '../components/Task';

export const Categories = () => {
    // Attributes
    // Context
    // Methods
    const tasks: ITask[] = [
        {
            title: 'Hola',
            level: 0
        },
        {
            title: 'Holaa',
            level: 1
        },
        {
            title: 'Holaaa',
            level: 2
        },
        {
            title: 'Holaaa',
            level: 0
        },
    ]
    // Component
    return (
        <VStack w='full'>
            <HStack w='full'>
                <Box w='20px' />
                <Heading>Categories</Heading>
                <Spacer />
                <Button variant='secundary'>
                    Edit
                </Button>
                <Box w='20px' />
            </HStack>
            <HStack w='full' overflowX='scroll'>
                <Box w='10px' />
                <Category
                    title="Home"
                    description='The description of Home Category'
                    color='2324'
                    tasks={tasks}
                />
                <Box w='10px' />
            </HStack>
        </VStack>
    );
}