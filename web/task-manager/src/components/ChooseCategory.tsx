import { Select, useDisclosure, Button, Input, Box, HStack, Spacer } from '@chakra-ui/react';
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
    const [newCategory, setNewCategory] = React.useState<string>('');
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
                            <Input
                                placeholder="New Category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.currentTarget.value)}
                            />
                            <Spacer />
                            <Box w='30px' />
                            <Spacer />
                            <Button variant='primary'>
                                <AddIcon />
                            </Button>
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