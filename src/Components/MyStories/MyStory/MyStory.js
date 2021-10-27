import { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import StoryContext from "../../../contexts/StoryContext";
import UserContext from "../../../contexts/UserContext";

const MyStory = () => {
    const{user} = useContext(UserContext);
    const{myStories} = useContext(StoryContext);
    const history = useHistory();
    const{myStoryId} = useParams();

    const[story, setStory] = useState('');
    const[loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        user &&
        myStories.length !== 0 &&
        myStories.forEach((x) => {
            if(x.id === myStoryId){
                setStory(x.story)
            }
        })
        setLoading(false);
    }, [myStoryId])

    const returnToQuestionaire = () => {
        history.push(process.env.PUBLIC_URL + `/my-stories`);
    }

    return(
        <div>
            <div className="storyF db pa4">
                <p>{story}</p>
            </div>
            <button className=" finalButton db" onClick={returnToQuestionaire}>
                Return
            </button>
        </div> 
    )
}

export default MyStory;