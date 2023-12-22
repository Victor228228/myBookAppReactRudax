import React, {Component} from 'react';
import Error from '../error';

export default class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
    }
    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <Error/>
        }
        return this.props.children; //если нет ошибки, то рендерим все что будет внутри компонента ErrorBoundry
    }
}