import { Box, Button, HStack, Heading, Spacer, VStack } from '@chakra-ui/react';
import React from 'react';
import { Category, ICategory } from '../components/Category';
import { useProvider } from '../context';
import { copyCategories } from '../handlers/categories';
import { handleDragAndDrop } from '../handlers/dragAndDrop';

export const Categories = () => {
    // Attributes
    const catDrag = React.useRef<any>(null);
    const catDrop = React.useRef<any>(null);
    // Context
    const { categories, setCategories } = useProvider();
    // Methods
    const handleOnDragEnd = () => {
        if (categories == null) return;
        let cats: ICategory[] = copyCategories(categories);
        let newCats = handleDragAndDrop(
            catDrag.current,
            catDrop.current,
            cats
        );
        // cats = newCats;
        setCategories(newCats);
    };
    // Component
    return (
        <VStack w='full'>
            <HStack w='full'>
                <Box w='20px' />
                <Heading>Categories</Heading>
                <Spacer />
                <Button variant='secundary'>
                    Edit
                </Button>
                <Box w='20px' />
            </HStack>
            <HStack
                w='full'
                overflowX='scroll'
            >
                <Box w='10px' />
                {
                    categories == null ? null :
                        categories.map((cat, idx) =>
                            <VStack
                                key={idx}
                                draggable
                                onDragStart={() => { catDrag.current = idx }}
                                onDragEnter={() => { catDrop.current = idx }}
                                onDragEnd={handleOnDragEnd}
                            >
                                <Category
                                    key={idx}
                                    title={cat.title}
                                    description={cat.description}
                                    color={cat.color}
                                    tasks={cat.tasks}
                                    id={cat.id}
                                />
                            </VStack>
                        )
                }
                <Box w='10px' />
            </HStack>
        </VStack>
    );
}