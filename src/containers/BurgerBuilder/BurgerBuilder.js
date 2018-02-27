import React, {Component} from 'react';
import AuxComp from '../../hoc/AuxComp/AuxComp';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		// axios.get('/ingredients.json')
		// 	.then(response => {
		// 		this.setState({ingredients: response.data});
		// 	})
		// 	.catch(error => {
		// 		this.setState({error: true});
		// 	})
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;
		let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients can`t be showed</p> : <Spinner />
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
							/>
						</AuxComp>
					);
				orderSummary = <OrderSummary
								purchaseCanceled={this.purchaseCancelHandler}
								purchaseContinued={this.purchaseContinueHandler}
								ingredients={this.props.ings}
								price={this.props.price}/>
				}
		if (this.state.loading) {
			orderSummary = <Spinner />
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
		this.setState({purchasing: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false});
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout');
	}
}


const mapStateToProps = (state) => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
		onIngredientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));