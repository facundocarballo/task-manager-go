import { InfoIcon } from '@chakra-ui/icons';
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


export interface ICategory {
   title: string,
   description: string,
   tasks: string[],
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
            h='250px'
            w='200px'
            bg={`#${color}`}
            borderRadius='10px'
            overflowY='scroll'
         >
            <HStack w='full'>
               <Box w='10px' />
               <Text
                  fontSize='20px'
                  fontWeight='bold'
               >
                  {title}
               </Text>
               <Spacer />
               <Button variant='info' bg={`#${color}`} onClick={onOpen}>
                  <InfoIcon />
               </Button>
            </HStack>
            {
               tasks.map((task, idx) => {
                  if (idx > MAX_TASK_SHOWED) return null;
                  return (
                     <VStack w='full'>
                        <HStack w='full'>
                           <Box w='3px' />
                           <Spacer />
                           <Text
                           >
                              {task}
                           </Text>
                           <Spacer />
                           <Box w='3px' />
                        </HStack>
                        <Divider />
                     </VStack>
                  )
               })
            }
            {
               tasks.length > MAX_TASK_SHOWED ? <Text>...</Text> : null
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