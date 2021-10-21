import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import MadLibs from "../assets/madlibs";

const StoryContext = createContext();

export const StoryContextProvider = ({children}) =>{
    const history = useHistory();

    const [story, setStory] = useState('');
    const [storyLength, setStorylength] = useState('');
    const [blanks, setBlanks] = useState([]);
    const [counter, setCounter] = useState(0);

    const chooseStory = (storyId) => {
        console.log(storyId)
        setStory(storyId);
        setStorylength(MadLibs.templates[storyId].blanks.length);
        console.log(MadLibs.templates[storyId].blanks.length)
    }

    const addWord = (word) => {
        if (word !== "") {
          setCounter(counter + 1);
          let _blanks = blanks
          _blanks.push(word);
          setBlanks(_blanks);
          console.log(_blanks)
        }
    };

    const previousWord = (event) => {
        if (counter !== 0) {
            setCounter(counter - 1);
            let _blanks = blanks
            _blanks.pop();
            setBlanks(_blanks);
            console.log(_blanks)
        } else {
            history.push(process.env.PUBLIC_URL + "/");
            setStory('');
            setStorylength('');
            setCounter(0);
        }
    };


    return(
        <StoryContext.Provider
            value={{
                chooseStory,
                counter,
                addWord,
                storyLength,
                previousWord
            }}
        >
            {children}
        </StoryContext.Provider>
    )
}

export default StoryContext;