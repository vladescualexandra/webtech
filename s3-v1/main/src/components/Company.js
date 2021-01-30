import React, { Component } from 'react'

class Company extends Component {
	constructor(props){
		super(props)
		let {item} = this.props
		this.state = {
			name : item.name,
			employees : item.employees,
			revenue : item.revenue,
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
  render() {
    let {item} = this.props
    if (this.state.isEditing){
      return (
        <div>
          <input type="button" value="save"  />
          <input type="button" value="cancel" />						
        </div>
      )
    }
    else{
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input type="button" value="edit" />        
        </div>
      )
    }
  }
}

export default Company
