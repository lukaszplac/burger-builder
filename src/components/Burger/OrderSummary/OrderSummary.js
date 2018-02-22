import React, {Component} from 'react';
import AuxComp from '../../../hoc/AuxComp/AuxComp';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    //This could be functional component nut left for now
    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</span>
                   </li>
        });

        return(
            <AuxComp>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button
                    clicked={this.props.purchaseCanceled}
                    btnType="Danger">
                    CANCEL
                </Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType="Success">
                    CONTINUE
                </Button>
            </AuxComp>
        );
    }
}


export default OrderSummary;