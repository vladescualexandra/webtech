import React, { Component } from 'react'

class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.id,
            name: this.props.item.name,
            employees: this.props.item.employees,
            revenue: this.props.item.revenue
        }

        this.delete = () => {
            this.props.onDelete(this.state.id);
        }
    }

    render() {
        return(
            <div>
                <span> {this.state.id} </span>
                <span> {this.state.name} </span>
                <span> {this.state.employees} </span>
                <span> {this.state.revenue} </span>
                <input type="button" value="delete" onClick={this.delete}/>
            </div>
        )
    }
}

export default Company
