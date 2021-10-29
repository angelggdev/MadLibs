import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import StoryContext from "../../contexts/StoryContext";
import UserContext from "../../contexts/UserContext";
import { Button } from "react-bootstrap";
import SaveStoryModal from "./SaveStoryModal/SaveStoryModal";

const Story = () => {
    const {finalStory, previousWord, story, selectAnotherStory} = useContext(StoryContext);
    const {user} = useContext(UserContext);

    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    useEffect(() => {
        user ? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [user])

    const returnToQuestionaire = () => {
        previousWord();
        history.push(process.env.PUBLIC_URL + `/story/${story}`);
    }

    return(
        <div className="finalLib">
            {
                finalStory !== 'Choose a template and build your own story!'  &&
                <button className=" finalButton db" onClick={returnToQuestionaire}>
                    Return
                </button>
            }
            <div className="storyF db pa4">
                <p>{finalStory}</p>
                {
                    isLoggedIn && finalStory !== 'Choose a template and build your own story!' &&
                    <Button variant='light' onClick={() => setShowSaveModal(true)}>
                        <FontAwesomeIcon icon={faSave} color='green' size='lg'/>
                    </Button>
                }
            </div>
            {
                finalStory !== 'Choose a template and build your own story!'  &&
                <button className="finalButton db" onClick={selectAnotherStory}>
                    Select another story
                </button>
            }
            <SaveStoryModal showSaveModal={showSaveModal} setShowSaveModal={setShowSaveModal} finalStory={finalStory}/>
        </div> 
    )
}

export default Story;