import React, {Component} from 'react';
import AuxComp from '../../hoc/AuxComp/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';



class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients can`t be showed</p> : <Spinner />
		if (this.props.ings) {
				burger = (
						<AuxComp>
							<Burger ingredients = {this.props.ings}/>
							<BuildControls 
								ingredientAdded = {this.props.onIngredientAdded}
								ingredientRemoved = {this.props.onIngredientRemove}
								disabled = {disabledInfo}
								price = {this.props.price}
								purchasable = {this.updatePurchaseState(this.props.ings)}
								ordered={this.purchasedHandler}
								isAuth={this.props.isAuthenticated}
							/>
						</AuxComp>
					);
				orderSummary = <OrderSummary
								purchaseCanceled={this.purchaseCancelHandler}
								purchaseContinued={this.purchaseContinueHandler}
								ingredients={this.props.ings}
								price={this.props.price}/>
		}
		return (
			<AuxComp>
				<Modal show={this.state.purchasing}
					   modalClosed={this.purchaseCancelHandler}>
					   {orderSummary}
				</Modal>
				{burger}
			</AuxComp>
			);
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	purchasedHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({purchasing: true});
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push('/checkout');
	}
}


const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
		onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));