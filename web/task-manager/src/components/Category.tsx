import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export const Category = () => {
   // Attributes
   // Context
   // Methods
   // Component
   return(
      <>
        <VStack w='200px' bg='red.400' borderRadius='20px'>
            <Heading>Home</Heading>
            <Box h='10px' />
            <Text>16 Tasks to do...</Text>
        </VStack>
      </>
   );
}