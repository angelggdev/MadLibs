import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import StoryContext from "../../contexts/StoryContext";
import UserContext from "../../contexts/UserContext";
import { addStory } from "../../services/firebase";

const Story = () => {
    const {finalStory, previousWord, story, selectAnotherStory} = useContext(StoryContext);
    const {user} = useContext(UserContext);

    const history = useHistory();;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        user ? setIsLoggedIn(true):setIsLoggedIn(false);
    }, [user])

    const returnToQuestionaire = () => {
        previousWord();
        history.push(process.env.PUBLIC_URL + `/story/${story}`);
    }

    return(
        <div className="finalLib">
            <button className=" finalButton db" onClick={returnToQuestionaire}>
                Return
            </button>
            <p className="storyF db pa4">{finalStory}</p>
            <button className="finalButton db" onClick={selectAnotherStory}>
                Select another story
            </button>
            {
                isLoggedIn &&
                <button className="finalButton db" onClick={() => addStory(finalStory.toString(), 'story-test')}>
                    Save story
                </button>
            }
        </div> 
    )
}

export default Story;