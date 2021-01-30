import React, { Component } from 'react'

class Company extends Component {
  render() {
  	let {item} = this.props
    return (
      <div>
    		Name {item.name} with {item.employees} employees {item.revenue} revenue
      </div>
    )
  }
}

export default Company
