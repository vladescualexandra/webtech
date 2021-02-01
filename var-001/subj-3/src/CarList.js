import React from 'react';
import { AddCar } from './AddCar';

export class CarList extends React.Component {
    constructor(){
        super();
        this.state = {
            cars: []
        };

        this.handleAdd = (car) => {
            let c = this.state.cars;
            c.push(car);
            this.setState({
                cars: c
            })
        }
        
    }   

    

    render(){
        return (
            <div>
                <AddCar onAdd={this.handleAdd}/>
            </div>
        )
    }
}