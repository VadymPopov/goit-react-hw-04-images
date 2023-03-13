import {useEffect} from "react";
import { createPortal } from 'react-dom';
import { Overlay,Modal } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

function ModalLightbox({onClose, children}){

    useEffect(()=>{
        const handleKeyDown = event => {
            if (event.code === 'Escape') {
              onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return(()=>{
            window.removeEventListener('keydown', handleKeyDown);
        })
    },[onClose])

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
         onClose();
        }
      };
   
        return createPortal(
            <Overlay onClick={handleBackdropClick}>
                <Modal>
                {children}
                </Modal>
            </Overlay>,
            modalRoot
        );
};

export default ModalLightbox;