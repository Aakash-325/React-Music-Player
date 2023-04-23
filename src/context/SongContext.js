import React, {useState, createContext} from "react";

export const SongContext = createContext(null);

export const SongProvider = ({ children }) => {
    const [selectedSongIndex, setSelectedSongIndex] = useState(null);

    const values = {
        selectedSongIndex: selectedSongIndex,
        setSelectedSongIndex: setSelectedSongIndex
    }
    return (
        <SongContext.Provider value={values}>
            { children }
        </SongContext.Provider>
    )
} 