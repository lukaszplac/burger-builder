import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients) //Object.keys daje tablice kluczy
		.map((igKey) => { //dla igKey zwracamy tablice o dlugosci igKey wypelniona pustymi miejscami [tylko o dlugosc tu chodzi]
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />
			});
		})
		.reduce((arr, el) => { //do pustej tablicy [] - initial value dolaczany jest el-current value
			return arr.concat(el);
		}, [] );
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>
	}
	console.log(transformedIngredients);
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"/>
				{transformedIngredients}
			<BurgerIngredient type="bread-bottom"/>
		</div>
	);
}

export default burger;