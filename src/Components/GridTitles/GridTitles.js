import Box from './Box/Box.js';
import MadLibs from '../../assets/madlibs.js';
import { useContext, useEffect } from 'react';
import StoryContext from '../../contexts/StoryContext.js';

const GridTitles = () => {
    const{
        setStory,
        setStorylength,
        setCounter,
        setFinalStory,
        setBlanks
    } = useContext(StoryContext);

    useEffect(() => {
        setStory('');
        setStorylength('');
        setCounter(0);
        setFinalStory('Choose a template and build your own story!');
        setBlanks([]);
    }, [])

    return (
        <div className= 'tc container'>
            <h1 className='tc title'>Choose a Story</h1>
            <div className='gridMadlibs'>
                {
                    MadLibs.templates.map((x, i) => {
                        return (
                        <Box 
                            key={i}
                            index={i}
                            titles={MadLibs.templates[i].title} 
                        />
                    );
                    })
                }
            </div>
        </div>
    );

}

export default GridTitles;