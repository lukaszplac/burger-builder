import React, {Component} from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Logout extends Component {
    
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = (dispaptch) => {
    return {
        onLogout: () => dispaptch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);