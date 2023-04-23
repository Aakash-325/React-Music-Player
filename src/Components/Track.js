import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverCloseButton,
    Button,
    Text,
    Box
  } from '@chakra-ui/react';
  import React, { useEffect, useContext } from 'react';
  import { RiArrowDropDownLine } from "react-icons/ri";
  import "../App.css";
  import MusicList from './MusicList';
  import { SongContext } from '../context/SongContext';
  
  export default function Track() {
    const { selectedSongIndex, setSelectedSongIndex } = useContext(SongContext);
   
    const handleSongClick = (index) => {
      setSelectedSongIndex(index);
    };
  
    useEffect(() => {
      console.log(selectedSongIndex);
    }, [selectedSongIndex]);
  
    return (
      <Popover
        placement="bottom-end"
        strategy="fixed"
        offset={[0, 8]}
        closeOnBlur={false}
        hasArrow={false}
      >
        <PopoverTrigger>
          <Button variant="unstyled" >
            <RiArrowDropDownLine size={40} />
          </Button>
        </PopoverTrigger>
        <PopoverContent color='white' className='popFont' sx={{
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          border: "none",
          borderRadius: "none",
          maxW: "200px",
        }}>
          <PopoverCloseButton />
          <PopoverBody>
            <Box>
              {MusicList.map((song, index) => (
                <Box className='songList' key={index} p="0.2rem" onClick={() => handleSongClick(index)}>
                  <Text key={index}> 
                    {song.songName}
                  </Text>
                </Box>
              ))}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
  