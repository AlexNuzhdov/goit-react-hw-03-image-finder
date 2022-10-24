import{Overlay, ModalStyled} from '../Modal/Modal.styled'
import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export  class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
      }
    
      componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    
      handleKeyDown = e => {
        if (e.code === 'Escape') {
          this.props.onClose();
        }
      };

      /*Закрытие модалки по бекдропу*/
      handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
          this.props.onClose();
        }
     };


render() {
    return createPortal (

      <Overlay onClick={this.handleBackdropClick}>
        <ModalStyled>{this.props.children}</ModalStyled>
        {/* <button type="button" onClick={this.props.onClose}>
          <GrClose style={{ width: 30, height: 30 }} />
        </button> */}
      </Overlay>,
       modalRoot,
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};