import React from 'react';
import { AddProduct } from './AddProduct';

export class ProductList extends React.Component {
    constructor(){
        super();
        this.state = {
            products: []
        };
    }

    handleAdd = (prod) => {
        let prds = this.state.products;
        prds.push(prod);
        this.setState({
            products: prds
        })
    }

    render(){
        return(
            <div>
                <AddProduct onAdd={this.handleAdd}/>
            </div>
        )
    }
}