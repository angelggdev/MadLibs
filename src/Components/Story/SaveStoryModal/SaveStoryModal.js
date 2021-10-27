import { useContext, useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import StoryContext from "../../../contexts/StoryContext";
import './SaveStoryModal.css';

const SaveStoryModal = (props) => {
    const {saveStory, savingStory} = useContext(StoryContext);
    const[storyName, setStoryName] = useState();

    return(
        <Modal
            animation={false}
            show={props.showSaveModal}
            onHide={() => {props.setShowSaveModal(!props.showSaveModal)}}
        >
            <Modal.Header className='modalHeader'>
                <Modal.Title className='saveModal'>
                    Save Story
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='saveModal'>
                {
                    savingStory?
                    <Spinner animation='grow' />
                    :
                    <>
                        <input type='text' onChange={(e) => setStoryName(e.target.value)} placeholder='Title'/>
                        <Button variant='success' onClick={() => saveStory(props.finalStory.toString(), storyName)}>Save</Button>
                    </>
                }
            </Modal.Body>
        </Modal>
    )
}

export default SaveStoryModal;