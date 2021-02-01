import React, {Component} from 'react';

class Robot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            name: this.props.item.name,
            type: this.props.type,
            mass: this.props.mass
        }

        this.handleDelete = () => {
            this.props.onDelete(this.state.id);
        }
    }

    render() {
        return(
            <div>
                <span> {this.state.id} </span>
                <span> {this.state.name} </span>
                <span> {this.state.type} </span>
                <span> {this.state.mass} </span>
                <input type="button" value="delete" onClick={this.handleDelete}/>
            </div>
        )
    }
}

export default Robot;