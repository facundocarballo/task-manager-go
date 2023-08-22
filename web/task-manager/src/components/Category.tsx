import { EditIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, HStack, Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react';
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


export interface ICategory {
   title: string,
   description: string,
   tasks: ITask[],
   color: string,
}

export const Category = ({ title, description, tasks, color }: ICategory) => {
   // Attributes
   const MAX_TASK_SHOWED = 3;

   // Alert Dialog
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
               tasks.map((task) => {
                  return (
                     <Task title={task.title} level={task.level} />
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