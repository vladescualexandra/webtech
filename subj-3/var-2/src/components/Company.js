import React, { Component } from 'react'

class Company extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name,
      employees: this.props.item.employees,
      revenue: this.props.item.revenue
  }
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleSelect = () => {
    this.props.onSelect(this.state);
  }

  render() {
  	let {item} = this.props
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input value="select" type="button" onClick={this.handleSelect}/>
        </div>
      )
  
  }
}

export default Company
