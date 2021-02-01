import React from 'react';

export class AddProduct extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            category: '',
            price: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    addProduct = () => {
        let product = {
            name: this.state.name,
            category: this.state.category,
            price: this.state.price
        };
        this.props.onAdd(product);
    }

    render(){
        return (
            <div>
                <input type="text" id="name" name="name" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="category" name="category" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="price" name="price" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="button" value="add product" 
                    onClick={this.addProduct} />
            </div>
        )
    }
}