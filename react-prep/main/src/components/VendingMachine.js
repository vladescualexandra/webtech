import React, { Component } from 'react'
import Product from './Product'
import ProductStore from '../stores/ProductStore'

class VendingMachine extends Component {
    constructor() {
        super()
        this.state = {
            products: [],
            tokens: 0
        }

        this.addToken = async () => {
            let number_of_tokens = this.state.tokens + 1;
            await this.setState({
                tokens: number_of_tokens
            });
        }

        this.buyProduct = async (price) => {            
            let number_of_tokens = this.state.tokens - price;
            if (price <= this.state.tokens) {
                await this.setState({
                    tokens: number_of_tokens
                });
            } else {
                alert('not enough tokens');
            }
        }
    }

    componentDidMount() {
        let store = new ProductStore();
        this.setState({
            products: store.getAll()
        })
    }


    render() {
        return (
            <div>
                {this.state.products.map((el, index) => <Product key={index} name={el.name} price={el.price} onBuy={this.buyProduct}  />)}
                <div>Tokens: {this.state.tokens}</div>
                <input type="button" value="add token" onClick={this.addToken}/>
            </div>
        )
    }
}

export default VendingMachine