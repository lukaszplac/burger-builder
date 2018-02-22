import React, {Component} from 'react';
import classes from './Modal.css';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    //dodane zeby polepszyc wydajnoc, modal nie bedzie sie updatowal jesli nie bedzie widoczny
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.show !== this.props.show);
    }

    render() {
        return(
            <AuxComp>
                <Backdrop show={this.props.show}
                        clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : 'translateY(-100vh)',
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </AuxComp>
        );
    }
}

export default Modal;