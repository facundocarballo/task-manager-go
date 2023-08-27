import { DragHandleIcon, InfoIcon } from '@chakra-ui/icons';
import { HStack, VStack, Box, Text, useDisclosure, Divider, Button, Spacer } from '@chakra-ui/react';
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
import { useProvider } from '../context';
import { TaskInfo } from './TaskInfo';
import { getStringDate } from '../handlers/date';
import { taskCompleted } from '../handlers/task';
import { copyCategories } from '../handlers/categories';

export interface ITask {
    title: string,
    id: number,
    category_id: number,
    dateCreated: Date,
    dateMustEnd: Date | null,
    dateEnded: Date | null,
    description: string | null
}

interface ITaskProps {
    task: ITask
}

export const Task = ({ task }: ITaskProps) => {
    // Attributes
    const [showDrag, setShowDrag] = React.useState<boolean>(false);
    const [showInfoBtn, setShowInfoBtn] = React.useState<boolean>(false);
    // AlertDialog Attributes
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)

    // Context
    const { categories, setCategories, tasksCompleted, setTasksCompleted } = useProvider();
    // Methods
    const handleMouseEnter = () => {
        setShowDrag(true);
        setShowInfoBtn(true);
    }
    const handleMouseLeave = () => {
        setShowDrag(false);
        setShowInfoBtn(false);
    }
    const handleCompleteTask = () => {
        if (categories == null) return;
        let cats = copyCategories(categories);
        const tasks = taskCompleted(task, cats[task.category_id].tasks);
        cats[task.category_id].tasks = tasks;
        task.dateEnded = new Date();
        cats[task.category_id].tasksCompleted.push(task);

        setCategories(cats);
        setTasksCompleted([...tasksCompleted, task])
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
    
    const handleShowInfoBtn = (): ReactElement<any> | null => {
        if (showInfoBtn) {
            return (
                <Button variant='info' onClick={onOpen}>
                    <InfoIcon />
                </Button>
            )
        }

        return null;
    }
    // Component
    return (
        <>
            {/* Alert Dialog - Task Info */}
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {task.title}
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />

                        <AlertDialogBody>
                            <TaskInfo
                                title="Description"
                                value={task.description}
                            />
                            <TaskInfo
                                title="Date Created"
                                value={getStringDate(task.dateCreated)}
                            />
                            <TaskInfo
                                title="Date Must End"
                                value={getStringDate(task.dateMustEnd)}
                            />

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
                    <Box w='3px' />
                    <Box
                        minW='35px'
                        maxW='35px'
                        minH='35px'
                        maxH='35px'
                        border='1px solid'
                        borderRadius='10px'
                        onClick={handleCompleteTask}
                        cursor='pointer'
                    />
                    <Text
                    >
                        {task.title}
                    </Text>
                    <Spacer />
                    {handleShowInfoBtn()}
                    <Box w='3px' />
                </HStack>
                <Divider />
            </VStack>
        </>
    );
}