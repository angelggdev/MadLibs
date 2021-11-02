import { Modal, Button } from "react-bootstrap";
import './ConfirmationModal.css';

const ConfirmationModal = (props) => {

    return(
        <Modal
            animation={false}
            size="sm"
            show={props.showConfirmationModal}
            onHide={() => {props.setShowConfirmationModal(!props.showConfirmationModal); props.reLoad()}}
        >
            <Modal.Header>
                <Modal.Title className='confirmationModalBody'>
                    Sure you want to delete the story?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='confirmationModalBody'>
                <Button variant='success' onClick={() => {props._removeStory(props.storyToDelete); props.setShowConfirmationModal(!props.showConfirmationModal)}}>Yes</Button>
                <Button variant='danger' onClick={() => {props.setShowConfirmationModal(!props.showConfirmationModal)}}>No</Button>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmationModal;