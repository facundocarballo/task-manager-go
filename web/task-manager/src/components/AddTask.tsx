import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack, Input } from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import { InputInfo } from './InputInfo';

export const AddTask = () => {
  // Attributes
  const [taskTitle, setTaskTitle] = React.useState<string>('');
  const [taskDescription, setTaskDescription] = React.useState<string>('');
  // const [taskEndDate, setTaskEndDate] = React.useState<Date>(new Date());
  // Alert Dialog
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const cancelRef = React.useRef(null);
  const onClose = () => setIsOpen(false);
  // Context
  // Methods
  const handleAddTaskTitle = async () => {

  }
  const handleAddInfo = () => {
    setIsOpen(true);
  }
  // Component
  return (
    <>
      {/*  Alert Dialog - Add More Info */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add a New Task
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              <InputInfo
                title='Title'
                placeholder='Task Title'
                value={taskTitle}
                handler={setTaskTitle}
              />
              <InputInfo
                title='Description'
                placeholder='Task Description'
                value={taskDescription}
                handler={setTaskDescription}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='green' onClick={onClose} ml={3}>
                Create Task
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <HStack w={{ 'lg': '60%', sm: '90%' }}>
        <Input
          placeholder="New task..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.currentTarget.value)}
          size='md'
        />
        <Button bg='green.500' onClick={handleAddTaskTitle}>
          <AddIcon />
        </Button>
        <Button color='white' bg='gray.800' onClick={handleAddInfo}>
          Add Info
        </Button>
      </HStack>
    </>
  );
}