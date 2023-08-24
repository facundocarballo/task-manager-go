import { VStack, Text, Box, Divider } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import React from 'react';
import { Category, ICategory } from './Category';
import { getNumberOfTasks } from '../handlers/task';

export interface IMiniCategory {
    cat: ICategory
}

export const MiniCategory = ({ cat }: IMiniCategory) => {
    // Attributes
    // Alert Dialog
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)
    // Context
    // Methods
    // Component
    return (
        <>

            {/* Alert Dialog - Show Complete Category */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                size='2xl'
            >
                <AlertDialogOverlay>
                    <AlertDialogContent >
                        <AlertDialogHeader bg={`#${cat.color}`} fontSize='lg' fontWeight='bold'>
                            {cat.title}
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            <Category 
                            color={cat.color}
                            description={cat.description}
                            id={cat.id}
                            tasks={cat.tasks}
                            title={cat.title}
                            />
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <VStack
                w='250px'
                bg={`#${cat.color}`}
                borderRadius='10px'
                _hover={{
                    transform: 'scale(1.1)',
                    shadow: 'lg',
                    cursor: 'pointer'
                }}
                onClick={onOpen}
            >
                <Box h='1px' />
                <Text
                    fontWeight='bold'
                    fontSize='18px'
                >
                    {cat.title}
                </Text>
                <Divider />
                <Text>{getNumberOfTasks(cat.tasks)}</Text>
                <Box h='5px' />
            </VStack>
        </>
    );
}