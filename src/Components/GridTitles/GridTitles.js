import {useContext} from 'react';
import Box from './Box/Box.js';
import MadLibs from '../../assets/madlibs.js';
import StoryContext from '../../contexts/StoryContext.js';

const GridTitles = () => {
    const {chooseStory} = useContext(StoryContext);



    return (
        <div className= 'tc'>
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