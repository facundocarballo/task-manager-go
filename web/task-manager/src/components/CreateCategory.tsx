import { Box,  HStack, Input, InputGroup, InputLeftAddon, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';

export interface ICreateCategory {
    title: string,
    description: string,
    color: string,

    setTitle: (_title: string) => void,
    setDescription: (_title: string) => void,
    setColor: (_title: string) => void
}

export const CreateCategory = ({ title, description, color, setTitle, setDescription, setColor }: ICreateCategory) => {
    // Attributes
    // Context
    // Methods
    // Component
    return (
        <>
            <VStack w='full'>
                <Input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <Input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <HStack w='full'>
                    <InputGroup>
                        <InputLeftAddon children="#" />
                        <Input
                            placeholder="Hexa Color"
                            value={color}
                            onChange={(e) => setColor(e.currentTarget.value)}
                            w='full'
                        />
                    </InputGroup>
                    <Spacer />
                    <Box
                        h='40px'
                        w='45px'
                        border='1px'
                        borderRadius='10px'
                        bg={`#${color}`}
                        _hover={{
                            transform: 'scale(1.1)',
                            boxShadow: 'md'
                        }}
                    />
                </HStack>

            </VStack>
        </>
    );
}