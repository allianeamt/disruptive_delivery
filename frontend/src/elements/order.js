import React, { Component } from "react";

class Order extends Component {
    constructor(params) {
        super(params);
        this.state = {
            click : false,
            text : params
        };
    }

    handleClick = () => {
        this.setState({click : true});
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>Click me</button>
                {this.state.click ? <h1>Clicked</h1> : null}
                <h1>{this.state.text}</h1>
            </div>
        );
    }
}

export default Order;