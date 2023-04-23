import React, {useState, createContext} from "react";
 
export const BackgroundContext = createContext(null);

export const BackgroundProvider = ({ children }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const values = {
        selectedImageIndex: selectedImageIndex,
        setSelectedImageIndex: setSelectedImageIndex
    }
    return (
        <BackgroundContext.Provider value={values}>
            { children }
        </BackgroundContext.Provider>
    )
} 