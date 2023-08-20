import { Select, useDisclosure, Button, Input, Box, HStack, Spacer, Heading, VStack } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import React from 'react';
import { SelectCategory } from './SelectCategory';
import { AddIcon } from '@chakra-ui/icons';

export const ChooseCategory = () => {
    // Attributes
    const [newTitle, setNewTitle] = React.useState<string>('');
    const [newDescription, setNewDescription] = React.useState<string>('');
    const [newColor, setNewColor] = React.useState<string>('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)
    // Context
    // Methods
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
                            Choose Category
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <SelectCategory />
                            <SelectCategory />
                            <SelectCategory />
                            <SelectCategory />
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <VStack>
                                <Heading>Create a new Category</Heading>
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
                                <Input
                                    placeholder="Color"
                                    value={newColor}
                                    onChange={(e) => setNewColor(e.currentTarget.value)}
                                />
                                <Button variant='primary'>
                                    CREATE CATEGORY
                                </Button>
                            </VStack>

                            <Spacer />
                            <Box w='30px' />
                            <Spacer />

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Button variant='secundary' onClick={onOpen}>
                Choose Category
            </Button>
        </>
    );
}