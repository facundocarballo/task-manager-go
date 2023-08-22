import { CheckIcon, InfoIcon } from '@chakra-ui/icons';
import { HStack, Spacer, VStack, Box, Button, Text, useDisclosure, Divider } from '@chakra-ui/react';
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

export interface ITask {
    title: string,
    level: number,
    subtasks: ITask[] | null
}

export const Task = ({title, level}: ITask) => {
    // Attributes
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)
    // Context
    // Methods
    const getWidthByLevel = (): string => {
        if (level == 0) return '3px';
        return `${level*50}px`;
    }
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

            <VStack w='full'>
                <HStack w='full'>
                    <Box w={getWidthByLevel()} />
                    <Box
                        minW='35px'
                        maxW='35px'
                        minH='35px'
                        maxH='35px'
                        border='1px solid'
                        borderRadius='10px'
                    />
                    <Text
                    >
                        {title}
                    </Text>
                    <Box w='3px' />
                </HStack>
                <Divider />
            </VStack>
        </>
    );
}