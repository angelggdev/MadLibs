import { useContext } from "react";
import { useHistory } from "react-router";
import StoryContext from "../../contexts/StoryContext";

const Story = () => {
    const {finalStory, previousWord, selectAnotherStory, story} = useContext(StoryContext);
    const history = useHistory();

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
        </div> 
    )
}

export default Story;