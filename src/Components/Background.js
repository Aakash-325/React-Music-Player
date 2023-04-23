import React, { useEffect, useContext } from 'react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverCloseButton,
    Box,
    Button,
    SimpleGrid
} from '@chakra-ui/react';
import { IoSettingsOutline } from "react-icons/io5";
import { BackgroundContext } from '../context/BackgroundContext';
import images from './Images';

export default function Background() {
    const { selectedImageIndex, setSelectedImageIndex } = useContext(BackgroundContext);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };
 
    useEffect(() => {
        console.log(selectedImageIndex);
    }, [selectedImageIndex]);

    const initialFocusRef = React.useRef();
    return (
        <Popover
            initialFocusRef={initialFocusRef}
            placement='bottom-start'
            closeOnBlur={false}
            hasArrow={false}
        >
            <PopoverTrigger>
                <Button variant="unstyled" >
                    <IoSettingsOutline size={22} />
                </Button>
            </PopoverTrigger>
            <PopoverContent color='white' sx={{
                backdropFilter: "blur(15px)",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                border: "none"
            }}>
                <PopoverHeader className='popFont' pt={4} fontWeight='bold' border='0'>
                    Set Background:
                </PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                    <SimpleGrid columns={4} spacing={2}>
                        {images.map((image, index) => (
                            <Box key={index} p="0.5rem" onClick={() => handleImageClick(index)}>
                                <img src={image} alt={`img${index + 1}`} />
                            </Box>
                        ))}
                    </SimpleGrid>
                </PopoverBody>
                <PopoverFooter
                    border='0'
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    pb={4}
                >
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
}