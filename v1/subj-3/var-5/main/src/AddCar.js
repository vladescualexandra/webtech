import React from 'react';

export class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            make: '',
            model: '',
            price: ''
        }
    }

    addCar = () => {
        let car = {
            make: this.state.make,
            model: this.state.model,
            price: this.state.price
        };
        this.props.onAdd(car);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return (
            <div>
                <input type="text" id="make" name="make" 
                    onChange={(e) => this.handleChange(e)}/>
                <input type="text" id="model" name="model"
                    onChange={(e) => this.handleChange(e)}/>
                <input type="text" id="price" name="price"
                    onChange={(e) => this.handleChange(e)}/>
                <input type="button" value="add car" onClick={this.addCar}/>
            </div>
        )
    }
}