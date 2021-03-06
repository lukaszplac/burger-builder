//Lazy Routes loading.... from router v4
import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
	return class extends Component {

		state = {
			component: null
		}

		componentDidMount() {
			importComponent()
				.then(cmp => {
					//console.log('laduje klase asynchronicznie');
					this.setState({component: cmp.default})
				});
		}

		render() {
			const C = this.state.component;
			return C ? <C {...this.props} /> : null;
			
		}
	}
}

export default asyncComponent;