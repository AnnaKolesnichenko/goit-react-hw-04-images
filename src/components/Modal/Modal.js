import css from './modal.module.css'
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({onModalClose, largeImageURL}) => {

    const onOverlayClick = (e) => {
        if (e.currentTarget === e.target) {
          onModalClose();
        }
      };

    const onKeyDown = (e) => {
        if(e.keyCode === 27) {
            onModalClose();
        }
      }

      useEffect(() => {
        const handleKeyDown = (e) => {
            onKeyDown(e);
        };

        window.addEventListener('keydown', handleKeyDown);

        return() => {
            window.removeEventListener('keydown', handleKeyDown);
        }
      }, [])

    

    return (
        <div className={css.overlay} onClick={onOverlayClick}>            
            <div className={css.modal}>
                <img src={largeImageURL} alt='' />
            </div>
        </div>
    )
}

Modal.propTypes = {
    largeImageURL: PropTypes.any.isRequired,
    onModalClose: PropTypes.func.isRequired
}

export default Modal;