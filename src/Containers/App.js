import React, { useState, useEffect } from 'react';
import './App.css';
import 'tachyons';
import GridTitles from '../Components/GridTitles.js';
import Questionaire from '../Components/questionaire.js';
import MadLibs from '../Components/madlibs.js';



function App() {

  const [screen, setScreen] = useState('');
  const [lib, setLib] = useState('');
  const [blanks, setBlanks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [searchfield, setSearchfield] = useState('');
  const [libLength, setLiblength] = useState('');

  const onClickChange = (event) => {
    setLib(event.target.value)
  }

  const TemplateChoice = () => {
    return (
    <div className='container'>
      <GridTitles mouseclick={onClickChange}/>
    </div>
    )
  }
  const ChangeUserInput = (event) => {
    setUserInput(event.target.value);
    setSearchfield(event.target.value);
  }
  const Submit = (event) => {
    if (userInput !== '') {
    setCounter(counter + 1);
    blanks.push(userInput);
    setSearchfield('');
    setUserInput('');
    }
  }
  const BackToMenu = () => {
    setCounter(0);
    setLib('');
    setSearchfield('');
    setBlanks([]);
    setUserInput('');
    setLiblength('')
  }

  const createMadLib = () => {
    const final = MadLibs.templates[lib].value.map((x, i) => {
      if (blanks[i] !== undefined) {
      return(
        x + blanks[i]
      )
      } else {
      return (x)
      }
    })
    setScreen( 
    <div className='finalLib'>
      <button className=' finalButton db' onClick={erase}>Return</button>
      <p className='storyF db pa4'>{final}</p>
      <button className='finalButton db' onClick={BackToMenu}>Select another story</button>
    </div>)
  }
  const Enter = (event) => {
    if (event.key === 'Enter') {
      Submit()
    }
  }
  const erase = (event) => {
    if (counter !== 0){
    setCounter(counter - 1);
    blanks.pop();
    setSearchfield('');
    } else {
      setCounter(0);
      setLib('');
    }
  }
  const Question = () => {
    if (MadLibs.templates[lib].blanks[counter] !== undefined) {
      setLiblength(MadLibs.templates[lib].blanks.length);
      setScreen (
        <div className='question'>
            <Questionaire 
            word={MadLibs.templates[lib].blanks[counter]}
            holus={ChangeUserInput}
            submit={Submit}
            lastQuestion={erase}
            field={searchfield}
            enterSubmit={Enter}
            number={counter}
            total={libLength}
            />
        </div>
    );
    } else {
      createMadLib()
    }
  } 
 


  useEffect(() => {
    if(lib === '') {
      setScreen(TemplateChoice);
    } else {
      Question()
    }
  },[lib, counter, userInput, libLength])


  return (
    screen
  )
}

export default App;
