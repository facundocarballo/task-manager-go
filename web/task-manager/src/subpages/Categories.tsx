import { HStack, Heading, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';
import { Category } from '../components/Category';

export const Categories = () => {
    // Attributes
    // Context
    // Methods
    // Component
    return (
        <VStack>  
            <Heading>Categories</Heading>
            <HStack w='full'>
                <Spacer />
                <Category />
                <Category />
                <Category />
                <Category />
                <Spacer />
            </HStack>
        </VStack>
    );
}