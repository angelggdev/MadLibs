import React from 'react';
import { Link } from 'react-router-dom';
import 'tachyons';
import {useContext} from 'react';
import StoryContext from '../../../contexts/StoryContext.js';


const Box = ({titles, index}) => {

    const {chooseStory} = useContext(StoryContext);
    return (
        <div >
            <div className='lib' >
                <Link onClick = {() => chooseStory(index)} style={{textDecoration:'none', color:'black'}} to={process.env.PUBLIC_URL + `/story/${index}`} className='box'>{titles}</Link>
            </div>
        </div>
    )
}

export default Box;