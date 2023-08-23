import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react';
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
import { ITask, Task } from './Task';
import { useProvider } from '../context';
import { handleDragAndDrop } from '../handlers/dragAndDrop';
import { copyCategories } from '../handlers/categories';


export interface ICategory {
   id: number,
   title: string,
   description: string,
   tasks: ITask[],
   color: string,
}

export const Category = ({ title, description, tasks, color, id }: ICategory) => {
   // Attributes
   const taskDraggable = React.useRef<any>(null);
   const taskReplaced = React.useRef<any>(null);
   // Alert Dialog
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cancelRef = React.useRef(null)
   // Context
   const { categories, setCategories } = useProvider();
   // Methods

   const handleDragOnEnd = () => {
      if (categories == null) return;
      let cats: ICategory[] = copyCategories(categories);
      let tasks = handleDragAndDrop(
         taskDraggable.current,
         taskReplaced.current,
         cats[id].tasks
      );
      cats[id].tasks = tasks;
      setCategories(cats);
   };

   const handleOnDragEnter = (id: number) => {
      taskReplaced.current = id;
   };

   const renderTasks = (task: ITask): any => {
      if (task.subtasks == null) {
         return (
            <Task
               key={task.id}
               title={task.title}
               level={task.level}
               subtasks={null}
               id={task.id}
               category_id={task.category_id}
            />
         );
      }
      return <>
         <Task
            key={task.id}
            title={task.title}
            level={task.level}
            subtasks={null}
            id={task.id}
            category_id={task.category_id}
         />
         {task.subtasks.map((subtask) => renderTasks(subtask))}
      </>
   };


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
                     {title}
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody>
                     {description}
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button variant='primary' ref={cancelRef} onClick={onClose}>
                        OK
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>

         <VStack
            minH='400px'
            maxH='400px'
            minW='600px'
            maxW='600px'
            bg={`#${color}`}
            borderRadius='10px'
            overflowY='scroll'
         >
            <HStack w='full'>
               <Box w='10px' />
               <Text
                  fontSize='30px'
                  fontWeight='bold'
               >
                  {title} ({tasks.length})
               </Text>
               <Spacer />
               <Button variant='info' bg={`#${color}`} onClick={onOpen}>
                  <EditIcon />
               </Button>
               <Button variant='info' bg={`#${color}`} onClick={onOpen}>
                  <InfoIcon />
               </Button>
            </HStack>
            {
               tasks.map((task, idx) => {
                  return (
                     <VStack
                        w='full'
                        draggable
                        onDragStart={(e) => {
                           taskDraggable.current = idx
                        }}
                        onDragEnter={() => handleOnDragEnter(idx)}
                        onDragEnd={handleDragOnEnd}
                     >
                        {renderTasks(task)}
                     </VStack>
                  )
               })
            }
            <Spacer />
            <Text>
               {tasks.length} Task{tasks.length > 1 ? 's' : null} to do
            </Text>
            <Box h='3px' />
         </VStack>
      </>
   );
}