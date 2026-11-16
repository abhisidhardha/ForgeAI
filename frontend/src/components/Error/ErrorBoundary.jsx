/** Catch descendant render/lifecycle failures. API and event-handler errors need their own handling. */
import { Component } from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends Component{
    constructor(props){
        super(props);

        this.state = {
            hasError : false ,
            error : null ,
        }
    }

    static getDerivedStateFromError(error){
        return {
            hasError : true ,
            error ,
        }
    }

    resetErrorBoundary = () => {
        this.setState({
            hasError : false ,
            error : null ,
        })
    }


    componentDidCatch(error , errorInfo){
        console.error("Error boundary caught an error" , error);
        console.error("Component Stack : ",errorInfo.componentStack);
    }

    render(){
        if(this.state.hasError){
            return (<ErrorFallback error={this.state.error} resetErrorBoundary={this.resetErrorBoundary}/>) ;
        }else{
            return this.props.children;
        }
    }

}

export default ErrorBoundary ;
