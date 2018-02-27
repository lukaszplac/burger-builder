import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component {

	onCheckoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	onCheckoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary 
					ingredients={this.props.ings} 
					onCheckoutCancelled={this.onCheckoutCancelledHandler}
					onCheckoutContinued={this.onCheckoutContinuedHandler}/>
				<Route path={this.props.match.url + '/contact-data'} component={ContactData} />
			</div>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.ingredients
	}
}

export default connect(mapStateToProps)(Checkout);