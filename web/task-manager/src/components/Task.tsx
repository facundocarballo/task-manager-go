import { CheckIcon, DragHandleIcon } from '@chakra-ui/icons';
import { HStack, VStack, Box, Text, useDisclosure, Divider, Center } from '@chakra-ui/react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import React, { ReactElement } from 'react';

export interface ITask {
    title: string,
    level: number,
    subtasks: ITask[] | null,
    id: number,
    category_id: number
}

export const Task = ({ title, level, id, category_id }: ITask) => {
    // Attributes
    const [showCheck, setShowCheck] = React.useState(false);
    const [showDrag, setShowDrag] = React.useState(false);

    // AlertDialog Attributes
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)

    // Context
    // Methods
    const getWidthByLevel = (): string => {
        if (level == 0) return '3px';
        return `${level * 50}px`;
    }
    const handleMouseEnter = () => {
        setShowDrag(true)
    }
    const handleMouseLeave = () => {
        setShowDrag(false)
    }
    const handleShowChcek = () => {
        setShowCheck(!showCheck)
    }

    // SubComponents    
    const showDragIcon = (): ReactElement<any> | null => {
        if (showDrag) {
            return (
                <>
                    <Box w='5px' />
                    <DragHandleIcon
                        cursor='pointer'
                        _hover={{
                            shadow: 'lg',
                            transform: 'scale(1.1)',
                        }}
                    />
                </>
            );
        }
        return <>
            <Box w='30px' />
        </>;
    }
    const showBoxCheck = (): ReactElement<any> | null => {
        if (showCheck) {
            return <Box
                minW='35px'
                maxW='35px'
                minH='35px'
                maxH='35px'
                border='1px solid'
                borderRadius='10px'
                onClick={handleShowChcek}
                cursor='pointer'
            >
                <Center>
                    <CheckIcon w='35px' h='30px' color='green' />
                </Center>
            </Box>
        }

        return (
            <Box
                minW='35px'
                maxW='35px'
                minH='35px'
                maxH='35px'
                border='1px solid'
                borderRadius='10px'
                onClick={handleShowChcek}
                cursor='pointer'
            />
        )
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

            <VStack
                w='full'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <HStack w='full'>
                    {showDragIcon()}
                    <Box w={getWidthByLevel()} />
                    {showBoxCheck()}
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