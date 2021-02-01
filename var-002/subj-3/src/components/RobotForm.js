import React, {Component} from 'react';

class RobotForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            type: '',
            mass: 0
        }

        this.handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            });
        }

        this.handleAdd = () => {
            this.props.onAdd(this.state);
        }
    }

    render() {
        return (
            <div>
                <input type="text" id="name" name="name" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="type" name="type" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="mass" name="mass" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="button" value="add"
                    onClick={this.handleAdd}/>
            </div>
        )
    }

}

export default RobotForm;