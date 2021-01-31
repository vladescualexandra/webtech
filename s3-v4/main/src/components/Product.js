import React, { Component } from 'react'

class Product extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            price: this.props.price
        }

        this.handleBuy = () => {
            this.props.onBuy(this.state.price);
        }
    }



    render() {
        return (
            <div>
                <span> {this.state.name} </span>
                <span> {this.state.price} </span>
                <input type="button" value="buy" onClick={this.handleBuy}/>
            </div>
        )
    }
}

export default Product