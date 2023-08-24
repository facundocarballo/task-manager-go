import { useDisclosure, Button, Box, Spacer } from '@chakra-ui/react';
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
import { CreateCategory } from './CreateCategory';

export const ChooseCategory = () => {
    // Attributes
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
                            <CreateCategory />
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