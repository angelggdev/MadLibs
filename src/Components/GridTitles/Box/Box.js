import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import 'tachyons';
import { useContext } from 'react';
import StoryContext from '../../../contexts/StoryContext.js';


const Box = ({titles, index}) => {
    const {chooseStory} = useContext(StoryContext);
    const history = useHistory();

    const goToStory = () => {
        history.push(process.env.PUBLIC_URL + `/story/${index}`);
    }

    return (
        <div >
            <div className='lib' onClick={goToStory}>
                <h2 style={{textDecoration:'none', color:'black'}} className='box'>{titles}</h2>
            </div>
        </div>
    )
}

export default Box;