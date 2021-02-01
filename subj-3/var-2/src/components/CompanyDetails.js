import React, { Component } from 'react'

class CompanyDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.item.name,
            employees: this.props.item.employees,
            revenue: this.props.item.revenue
        }

        this.cancel = () => {
            this.props.onCancel();
        }
    }

    render() {
        return(
            <div>
                <span> {this.state.name} </span>
                <span> {this.state.employees} </span>
                <span> {this.state.revenue} </span>
                <input type="button" value="cancel" onClick={this.cancel}/>

            </div>
        );
    }
}

export default CompanyDetails
