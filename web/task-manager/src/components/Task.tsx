import { InfoIcon } from '@chakra-ui/icons';
import { HStack, Spacer, VStack, Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { TheDivider } from './TheDivider';

export const Task = () => {
   // Attributes
   // Context
   // Methods
   // Component
   return(
      <>
        <VStack w='400px' >
            <Box h='5px'/>
            <HStack w='full'>
                <Spacer />
                <Button variant='secundary' size='sm' borderRadius='10'>
                    <InfoIcon color='white' />
                </Button>
            </HStack>
            <HStack w='full' bg='gray.300' borderRadius='15px'>
                <Box w='10px'/>
                <Text>Do Something...</Text>
                <Spacer />
                <Button h='50px' w='100px' variant='primary'>
                    DONE
                </Button>
            </HStack>
            <TheDivider horizontal={true} />
        </VStack>
      </>
   );
}