import React, {useState, useEffect, useContext} from 'react';
import StoryContext from '../../contexts/StoryContext';
import MadLibs from '../../assets/madlibs';
import { useParams } from 'react-router';

const Question = () => {
    const {
        counter, 
        addWord, 
        storyLength, 
        previousWord, 
        setStory, 
        setStorylength
    } = useContext(StoryContext)
    const {storyId} = useParams();
    const [word, setWord] = useState('');
    const [question, setQuestion] = useState('');
    const [input, setInput] = useState('');

    useEffect(() => {
        setStory(storyId);
        setStorylength(MadLibs.templates[storyId].blanks.length);
    }, [storyId])

    useEffect(() => {
        setQuestion(MadLibs.templates[storyId].blanks[counter]);
        setInput("");
        setWord("");
    }, [counter])

    const enter = (event) => {
        if (event.key === "Enter") {
            addWord(input)
        }
    };


    return (
        <div className='question'>
            <div className='enter dib'>
                <button className='button' onClick={previousWord}>Return</button>
                <p>{`Enter ${question}`}</p>
                <p className='f6'>{counter + 1}/{storyLength}</p>
                <input className='input' value={input} onChange={(e) => {setWord(e.target.value); setInput(e.target.value)}} onKeyPress={enter} type='text' minLength='1' maxLength='40'/>
                <button className='button' onClick={() => addWord(word)}>Submit</button>
            </div>
        </div>
    )
}

export default Question;