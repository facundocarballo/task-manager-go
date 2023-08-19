import { HStack, Spacer, VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { ChooseCategory } from '../components/ChooseCategory';
import { AddTask } from '../components/AddTask';

export const InputTask = () => {
    // Attributes
    // Context
    // Methods
    // Component
    return (
        <>
            <VStack w='full'>
                <HStack w='full'>
                    <Box w='20%' />
                    <ChooseCategory />
                </HStack>
                <HStack w='full'>
                    <Box w='20%' />
                    <AddTask />
                </HStack>
            </VStack>
        </>
    );
}