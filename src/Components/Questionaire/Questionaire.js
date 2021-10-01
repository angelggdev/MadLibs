import React from 'react';
import MadLibs from '../madlibs.js';

const Questionaire = ({userInput, word, submit, searchfield, enter, erase, counter, libLength}) => {
    return (
        <div className='enter dib'>
            <button className='button' onClick={erase}>Return</button>
            <p>{`Enter ${word}`}</p>
            <p className='f6'>{counter + 1}/{libLength}</p>
            <input className='input' value={searchfield} onChange={userInput} onKeyPress={enter} type='text' minLength='1' maxLength='40'/>
            <button className='button' onClick={submit}>Submit</button>
        </div>
    )
}

export default Questionaire;