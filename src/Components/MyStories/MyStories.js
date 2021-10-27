import './MyStories.css';
import { useContext, useEffect, useState } from 'react';
import Box from '../GridTitles/Box/Box';
import { Spinner, Button } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import StoryContext from '../../contexts/StoryContext';
import { useHistory } from 'react-router';

const MyStories = () => {
    const{user} = useContext(UserContext);
    const history = useHistory();
    const{getUserStories, myStories, setMyStories} = useContext(StoryContext);

    useEffect(() => {
        setMyStories([]);
        user &&
        getUserStories();
    }, [user])

    return(
        <div className='myStoriesContainer'>
            {
                user?
                myStories.length !== 0?
                myStories.map((x, i) => {
                    return(
                        <Button 
                            variant='none' 
                            key={x.id} 
                            className="storyF db pa4"
                            onClick={() => history.push(process.env.PUBLIC_URL + `/my-stories/${x.id}`)}
                        >
                            {x.title}
                        </Button>
                    )
                })
                :
                <Spinner animation='grow'/>
                :
                <div className="storyF db pa4">
                    Register to create your own stories or login to see your stories!
                </div>
            }
        </div>
    )
}

export default MyStories;