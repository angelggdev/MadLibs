import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import './SaveStoryModal.css';
import {addStory} from '../../../services/firebase';

const SaveStoryModal = (props) => {
    const[storyName, setStoryName] = useState();
    const[savingStory, setSavingStory] = useState(false);

    const saveStory = (_story, storyName) => {
        setSavingStory(true);
        addStory(_story, storyName)
        .then(() => {
            setSavingStory(false);
            props.setShowSaveModal(!props.showSaveModal);
        })
        .catch(() => {
            setSavingStory(false);
        })
    }

    return(
        <Modal
            autoFocus={false}
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
                        <input type='text' autoFocus={true} onChange={(e) => setStoryName(e.target.value)} onKeyUp={e => e.key === 'Enter' && saveStory(props.finalStory.toString(), storyName)} placeholder='Title'/>
                        <Button variant='success' onClick={() => saveStory(props.finalStory.toString(), storyName)}>Save</Button>
                    </>
                }
            </Modal.Body>
        </Modal>
    )
}

export default SaveStoryModal;