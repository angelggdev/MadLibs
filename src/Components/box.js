import React from 'react';
import 'tachyons';

const Box = ({titles, clickchange, index}) => {
    return (
        <div >
            <div className='lib' >
                <button className='box'onClick={clickchange} value={index}>{titles}</button>
            </div>
        </div>
    )
}

export default Box;