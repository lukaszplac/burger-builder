import React, {Component} from 'react';
import AuxComp from '../AuxComp/AuxComp';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {

	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false})
	}

	sideDrawerOpenHandler = () => {
		this.setState((prevState) => { //ze wzgledu na asynchronicznosc setState nie mozna uzywac stanu w samej metodzie setState trzeba to zrobic poprzez arrow function
			return ({showSideDrawer: !prevState.showSideDrawer});
		});
	}
	
	render (){
		return (
			<AuxComp>
				<Toolbar 
					isAuth={this.props.isAuthenticated}
					openSideDrawer={this.sideDrawerOpenHandler}/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</AuxComp>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);