import React, { useRef, useState, useContext, useEffect } from 'react';
import './App.css';
import { Box, Image, Text, HStack, Flex, Spinner } from '@chakra-ui/react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FaForward, FaBackward, FaHeadphonesAlt } from "react-icons/fa";
import Background from './Components/Background';
import Track from './Components/Track';
import images from './Components/Images';
import MusicList from './Components/MusicList';
import { BackgroundContext } from './context/BackgroundContext';
import { SongContext } from './context/SongContext';

const App = () => {
  const [currentMusicDetials, setCurrentMusicDetails] = useState(
    MusicList[0]
  );
  const [loading, setLoading] = useState(true)
  const [audioProgress, setAudioProgress] = useState();
  const currentAudio = useRef();
  const [isAudioplaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const { selectedImageIndex } = useContext(BackgroundContext)
  const { selectedSongIndex } = useContext(SongContext)
  

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }

  const musicAPI = [];

  for (let i = 0; i < MusicList.length && i < 15; i++) {
    musicAPI.push(MusicList[i]);
  }

  const handleNextSong = () => {
    if (musicIndex === musicAPI.length - 1) {
      setMusicIndex(0);
      updateCurrentMusicDetails(0);
    } else {
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = () => {
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    } else {
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number) => {
  let musicObject = musicAPI[number];
  if (musicObject) {
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName || '',
      songArtist: musicObject.songArtist || '',
      songSrc: musicObject.songSrc || '',
      songAvatar: musicObject.songAvatar || ''
    }); 
    setIsAudioPlaying(true);
  }
}

  const handleAudioUpdate = () => {
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${currentSec < 10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress) ? 0 : progress)
  }
  useEffect(() => {
    if (selectedSongIndex >= 0 && selectedSongIndex < MusicList.length) {
      const selectedSong = MusicList[selectedSongIndex];
      if (selectedSong) {
        setCurrentMusicDetails({
          songName: selectedSong.songName || '',
          songArtist: selectedSong.songArtist || '',
          songSrc: selectedSong.songSrc || '',
          songAvatar: selectedSong.songAvatar || ''
        });
      }
    }
    setLoading(false)
  }, [selectedSongIndex]);
  
  if (loading) {
    return (
      <Flex height='100vh' display='flex' justifyContent='center' alignItems="center">
        <Spinner size='xl' />
      </Flex>
    )
  }
  return (
    <Box className='container'>
      <audio src={MusicList[selectedSongIndex || 0].songSrc} ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate} autoPlay></audio>
      <Image src={images[selectedImageIndex || 3]} alt="img1" className='bg-img' />
      <Box className='blackScreen' >
      </Box>
      <Box>
        <Box m={{ base: "1rem", md: "2rem" }} position="absolute" left="2" top="2" display="flex" flexDirection="row" alignItems="center">
          <FaHeadphonesAlt size={20} />
          <Text mr="1.4rem" ml="10px" fontSize="xl" >Music Track</Text>
          <Track />
        </Box>
        <Box m={{ base: "1rem", md: "2rem" }} position="absolute" right="2" top="2" >
          <Background />
        </Box>
      </Box>
      <Box className='music-container' >
        <Text className="musicPlayer" >Music Player</Text>
        <Text className='music-Heading' >{currentMusicDetials.songName}</Text>
        <Text className='music-Artist' >{currentMusicDetials.songArtist}</Text>
        <Image id="songAvatar" src={currentMusicDetials.songAvatar} alt="Avatar" borderRadius="full" boxSize="200px" />
        <Box className='musicTimerDiv' >
          <Text className='musicCurrentTime'>{musicCurrentTime}</Text>
          <Text className='musicTotalLength'>{musicTotalLength}</Text>
        </Box>
        <input type="range" name="musicProgressBar" className='musicProgressBar'
          value={audioProgress} onChange={handleMusicProgressBar} ></input>
        <Box className="musicControlers" >
          <HStack gap={2} >
            <FaBackward onClick={handlePrevSong} />
            {isAudioplaying ? (
              <AiFillPauseCircle className='playBtn' onClick={handleAudioPlay} />
            ) : (
              <AiFillPlayCircle className='playBtn' onClick={handleAudioPlay} />
            )}
            <FaForward onClick={handleNextSong} />
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default App;