import React, {Component} from 'react';
import AuxComp from '../AuxComp/AuxComp';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		state = {
			error: null
		}

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: null});
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(res => res, error => {
				this.setState({error: error});
			})
		}
		//usuwanie interceptorow ktore nie sa juz potrzebne, 
		//inaczej mogloby to prowadzic po jakims czasie do wyciekow pamieci
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({error: null});
		}
		render() {
			return (
				<AuxComp>
						<Modal 
							show={this.state.error}
							modalClosed={this.errorConfirmedHandler}>
							{this.state.error ? this.state.error.message : null}
						</Modal>
						<WrappedComponent {...this.props} />
				</AuxComp>
				);
		}
	}
}

export default withErrorHandler;
