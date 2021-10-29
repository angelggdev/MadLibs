import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import MadLibs from "../assets/madlibs";
import { getStories } from "../services/firebase";

const StoryContext = createContext();

export const StoryContextProvider = ({children}) =>{
    const history = useHistory();

    const [story, setStory] = useState('');
    const [storyLength, setStorylength] = useState('');
    const [blanks, setBlanks] = useState([]);
    const [counter, setCounter] = useState(0);
    const [finalStory, setFinalStory] = useState('Choose a template and build your own story!');
    const [myStories, setMyStories] = useState([]);
    const [gettingStories, setGettingStories] = useState(false);

    const addWord = (word) => {
        if (word !== "" && counter < storyLength - 1) {
          setCounter(counter + 1);
          let _blanks = blanks
          _blanks.push(word);
          setBlanks(_blanks);
        } 
        if (word !== "" && counter === storyLength - 1) {
            history.push(process.env.PUBLIC_URL + "/result");
            setCounter(counter + 1);
            let _blanks = blanks
            _blanks.push(word);
            setBlanks(_blanks);
            buildStory();
        }
    };

    const previousWord = (event) => {
        if (counter !== 0) {
            setCounter(counter - 1);
            let _blanks = blanks
            _blanks.pop();
            setBlanks(_blanks);
        } else {
            selectAnotherStory();
        }
    };
    
    const selectAnotherStory = () => {
        history.push(process.env.PUBLIC_URL + "/");
        setStory('');
        setStorylength('');
        setCounter(0);
        setFinalStory('Choose a template and build your own story!');
        setBlanks([]);
    }

    const buildStory = () => {
        let _finalStory = MadLibs.templates[story].value.map((x, i) => {
            if (blanks[i] !== undefined) {
              return x + blanks[i];
            } else {
              return x;
            }
        });
        setFinalStory(_finalStory);
    } 

    const getUserStories = () => {
        setGettingStories(true);
        getStories()
        .then((res) => {
            setMyStories(res);
            setGettingStories(false);
        });
    }


    return(
        <StoryContext.Provider
            value={{
                counter,
                addWord,
                storyLength,
                previousWord,
                finalStory,
                setStory,
                setStorylength,
                story,
                selectAnotherStory,
                setCounter,
                setFinalStory,
                setBlanks,
                getUserStories,
                myStories,
                setMyStories,
                gettingStories
            }}
        >
            {children}
        </StoryContext.Provider>
    )
}

export default StoryContext;