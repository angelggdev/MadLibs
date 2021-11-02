import './MyStories.css';
import { useContext, useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import UserContext from '../../contexts/UserContext';
import StoryContext from '../../contexts/StoryContext';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';
import { removeStory } from '../../services/firebase';

const MyStories = () => {
    const{user} = useContext(UserContext);
    const history = useHistory();
    const{getUserStories, myStories, setMyStories, gettingStories} = useContext(StoryContext);
    const[removingStory, setRemovingStory] = useState(false);
    const[storyToDelete, setStoryToDelete] = useState('');
    const[showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        setMyStories([]);
        user &&
        getUserStories();
        // eslint-disable-next-line
    }, [user])

    const _removeStory = (storyId) => {
        setRemovingStory(true);
        removeStory(user, storyId)
        .then(() => {
            setRemovingStory(false);
            getUserStories();
        })
    }

    return(
        <div className='myStoriesContainer'>
            {
                user?
                !gettingStories?
                myStories.length !== 0?
                myStories.map((x, i) => {
                    return(
                        <div 
                            key={x.id}
                            className="storyF db pa4"
                        >
                            <Button 
                                variant='none' 
                                onClick={() => history.push(process.env.PUBLIC_URL + `/my-stories/${x.id}`)}
                            >
                                {x.title}
                            </Button>
                            {
                                removingStory?
                                <Spinner animation='grow'/>
                                :
                                <Button className='removeStory' onClick={() => {setStoryToDelete(x.id); setShowConfirmationModal(true)}}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            }
                        </div>
                    )
                })
                :
                <div className="storyF db pa4">
                    Play to create your first story!
                </div>
                :
                <Spinner animation='grow'/>
                :
                <div className="storyF db pa4">
                    Register to create your own stories or login to see your stories!
                </div>
            }
            <ConfirmationModal storyToDelete={storyToDelete} _removeStory={_removeStory} setShowConfirmationModal={setShowConfirmationModal} showConfirmationModal={showConfirmationModal}/>
        </div>
    )
}

export default MyStories;