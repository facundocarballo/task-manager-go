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
                <Category
                    title="Home"
                    description='The description of Home Category'
                    color='2324'
                    tasks={['hola', 'chau']}
                />
                <Category
                    title="House"
                    description='The description of House Category'
                    color='f232'
                    tasks={['Crear Interfaz Grafica', 'Visualizar las tareas pendientes ordenadas por categoria', 'ADIOS', 'ja', 'le']}
                />
                <Spacer />
            </HStack>
        </VStack>
    );
}