import React from 'react';

class AddDevice extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            price: 0
        }
    }

    handleChange = (e, id) => {
        if(id === 1) {
            this.setState({
                name: e.target.value
            })
        } else if (id === 2) {
            this.setState({
                price: parseInt(e.target.value)
            })
        }
        
    }

    addItem = () => {
        this.props.onAdd(this.state);
    }

    render() {
        return (
            <div>
                <input id="name" type="text" onChange={(e) => this.handleChange(e, 1)}/>
                <input id="price" type="text" onChange={(e) => this.handleChange(e, 2)}/>
                <button value="Submit" type="button" onClick={this.addItem}>
                    Add</button>
            </div>
        )
    }
}

export default AddDevice;