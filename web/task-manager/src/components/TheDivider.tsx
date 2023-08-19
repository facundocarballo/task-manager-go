import { Box } from '@chakra-ui/react';
import React from 'react';

export interface ITheDivider {
   horizontal: boolean
}

export const TheDivider = ({ horizontal }: ITheDivider) => {
   // Attributes
   // Context
   // Methods
   // Component
   if (horizontal) {
      return (
         <>
            <Box h='10px' />
            <Box w='full' h='3px' bg='gray.100' />
            <Box h='10px' />
         </>
      )
   } else {
      return (
         <>
            <>
               <Box w='10px' />
               <Box h='150px' w='3px' bg='gray.100' />
               <Box w='10px' />
            </>
         </>
      )
   }
}