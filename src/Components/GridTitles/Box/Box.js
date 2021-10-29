import React from 'react';
import { useHistory } from 'react-router-dom';
import 'tachyons';


const Box = ({titles, index}) => {
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