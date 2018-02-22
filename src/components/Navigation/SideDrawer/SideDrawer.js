import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AuxComp from '../../../hoc/AuxComp/AuxComp';

const sideDrawer = (props) => {

	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}

	return (
		<AuxComp>
			<Backdrop show={props.open} 
					  clicked={props.closed}/>
			<div className={attachedClasses.join(' ')}>
				<Logo height="11%" marginBottom="32px"/>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</AuxComp>
		);
}

export default sideDrawer;