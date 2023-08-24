import { Box, Button, HStack, Heading, Input, InputGroup, InputLeftAddon, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';

export const CreateCategory = () => {
    // Attributes
    const [newTitle, setNewTitle] = React.useState<string>('');
    const [newDescription, setNewDescription] = React.useState<string>('');
    const [newColor, setNewColor] = React.useState<string>('');
    // Context
    // Methods
    // Component
    return (
        <>
            <VStack w='full'>
                <Heading>Create Category</Heading>
                <Input
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.currentTarget.value)}
                />
                <Input
                    placeholder="Description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.currentTarget.value)}
                />
                <HStack w='full'>
                    <InputGroup>
                        <InputLeftAddon children="#" />
                        <Input
                            placeholder="Hexa Color"
                            value={newColor}
                            onChange={(e) => setNewColor(e.currentTarget.value)}
                            w='full'
                        />
                    </InputGroup>
                    <Spacer />
                    <Box
                        h='40px'
                        w='45px'
                        borderRadius='10px'
                        bg={`#${newColor}`}
                        _hover={{
                            transform: 'scale(1.1)',
                            boxShadow: 'md'
                        }}
                    />
                </HStack>
                <Button variant='primary'>
                    CREATE CATEGORY
                </Button>
            </VStack>
        </>
    );
}