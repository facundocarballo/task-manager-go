import { AddIcon } from '@chakra-ui/icons';
import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';

export const AddTask = () => {
   // Attributes
   const [task, setTask] = React.useState<string>('');
   // Context
   // Methods
   const handleAddTask = async () => {
    
   }
   // Component
   return(
      <>
        <HStack w={{'lg': '60%', sm: '90%'}}>
            <Input 
            placeholder="New Task..."
            value={task}
            onChange={(e) => setTask(e.currentTarget.value)}
            size='md'
            />
            <Button bg='green.500' onClick={handleAddTask}>
                <AddIcon />
            </Button>
        </HStack>
      </>
   );
}