import React from 'react';
import MadLibs from './madlibs.js';

const Questionaire = ({holus, word, submit, field, enterSubmit, lastQuestion, number, total}) => {
    return (
        <div className='enter dib'>
            <button className='button' onClick={lastQuestion}>Return</button>
            <p>{`Enter ${word}`}</p>
            <p className='f6'>{number + 1}/{total}</p>
            <input className='input' value={field} onChange={holus} onKeyPress={enterSubmit} type='text' minLength='1' maxLength='40'/>
            <button className='button' onClick={submit}>Submit</button>
        </div>
    )
}

export default Questionaire;