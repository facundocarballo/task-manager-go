import { DragHandleIcon, EditIcon, InfoIcon } from '@chakra-ui/icons';
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
import React, { ReactElement } from 'react';
import { ITask, Task } from './Task';
import { useProvider } from '../context';
import { handleDragAndDrop } from '../handlers/dragAndDrop';
import { copyCategories } from '../handlers/categories';
import { copyTasks, getNumberOfTasks } from '../handlers/task';
import { InputInfo } from './InputInfo';


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
   const [showDragIcon, setShowDragIcon] = React.useState<boolean>(false);
   // Create Task
   const [createTaskIsOpen, setCreateTaskIsOpen] = React.useState<boolean>(false);
   const [taskTitle, setTaskTitle] = React.useState<string>('');
   const [taskDescription, setTaskDescription] = React.useState<string>('');
   const [taskEndDate, setTaskEndDate] = React.useState<Date>(new Date());
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

   const handleShowDragIcon = (): ReactElement<any> | null => {
      if (showDragIcon) {
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

   const handleMouseEnter = () => {
      setShowDragIcon(true)
   }

   const handleMouseLeave = () => {
      setShowDragIcon(false)
   }

   const handleSetDate = (e: string) => {
      const date = new Date(e);
      setTaskEndDate(date);
   };

   const handleCreateTask = () => {
      if (categories == null) return;
      let cats = copyCategories(categories);
      const taskId = cats[id].tasks[cats[id].tasks.length - 1].id + 1;
      let tasks = copyTasks(cats[id].tasks);
      tasks.push({
         title: taskTitle,
         category_id: id,
         level: 0,
         subtasks: null,
         id: taskId
      });
      cats[id].tasks = tasks;
      setCategories(cats);
      setCreateTaskIsOpen(false);
   }

   // Component
   return (
      <>
         {/* Alert Dialog - Category Info */}
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

         {/* Alert Dialog - Create Task */}
         <AlertDialog
            isOpen={createTaskIsOpen}
            leastDestructiveRef={cancelRef}
            onClose={() => setCreateTaskIsOpen(false)}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                     Create Task
                  </AlertDialogHeader>
                  <AlertDialogCloseButton />

                  <AlertDialogBody>
                     <InputInfo
                        title='Title'
                        placeholder='Task Title'
                        value={taskTitle}
                        type='text'
                        handler={setTaskTitle}
                     />
                     <InputInfo
                        title='Description'
                        placeholder='Task Description'
                        value={taskDescription}
                        type='text'
                        handler={setTaskDescription}
                     />
                     <InputInfo
                        value={undefined}
                        title='Deadline'
                        placeholder="Task Deadline"
                        type='datetime-local'
                        handler={handleSetDate}
                     />
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button variant='primary' onClick={handleCreateTask} ml={3}>
                        Create Task
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
            <HStack
               w='full'
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
            >
               {handleShowDragIcon()}
               <Box w='10px' />
               <Text
                  fontSize='30px'
                  fontWeight='bold'
               >
                  {title} ({getNumberOfTasks(tasks)})
               </Text>
               <Spacer />
               <Button variant='info' bg={`#${color}`} onClick={() => setCreateTaskIsOpen(true)}>
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
         </VStack>
      </>
   );
}