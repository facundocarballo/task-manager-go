import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { HStack, Spacer, VStack, Box, Button, Text, useDisclosure } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import React from 'react';
import { TheDivider } from './TheDivider';

export const Task = () => {
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
                            Task Title
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <VStack w='400px' >
                <Box h='5px' />
                <HStack w='full'>
                    <HStack w='100px' bg='red.400' borderRadius='5px'>
                        <Spacer />
                        <Text >Home</Text>
                        <Spacer />
                    </HStack>
                    <Spacer />
                    <Button variant='info' onClick={onOpen}>
                        <InfoIcon />
                    </Button>
                </HStack>
                <HStack w='full' bg='gray.100' borderRadius='15px'>
                    <Box w='10px' />
                    <Text>Do Something...</Text>
                    <Spacer />
                    <Button variant='primary'>
                        <CheckIcon />
                    </Button>
                </HStack>
                <TheDivider horizontal={true} />
            </VStack>
        </>
    );
}