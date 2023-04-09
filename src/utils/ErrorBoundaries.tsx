import React, {Component, ReactNode} from 'react';

interface ErrorBoundariesProps{
    children:ReactNode
}

interface ErrorBoundariesState{
    hasError:boolean,
    error:Error|null
}

class ErrorBoundaries extends Component<ErrorBoundariesProps, ErrorBoundariesState> {

    constructor(props:ErrorBoundariesProps) {
        super(props);
        this.state={hasError: false, error: null}
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({hasError:true, error})
    }

    state={hasError:false, error:null}
    render() {
        if(this.state.hasError){
            return <h1>Something went wrong</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundaries;