import { Box, Button, HStack, Heading, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../components/Category';
import { ITask } from '../components/Task';
import { useProvider } from '../context';

export const Categories = () => {
    // Attributes
    // Context
    const { categories } = useProvider();
    // Methods
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
                {
                    categories == null ? null :
                        categories.map((cat, idx) =>
                            <Category
                                key={idx}
                                title={cat.title}
                                description={cat.description}
                                color={cat.color}
                                tasks={cat.tasks}
                                id={cat.id}
                            />
                        )
                }
                <Box w='10px' />
            </HStack>
        </VStack>
    );
}