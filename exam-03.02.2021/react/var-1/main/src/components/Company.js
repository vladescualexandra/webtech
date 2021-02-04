import React, { Component } from 'react'

class Company extends Component {
	constructor(props){
		super(props)
		let {item} = this.props
		this.state = {
      id: item.id,
			name : item.name,
			employees : item.employees,
			revenue : item.revenue,
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
    }
    
    this.handleEdit = () => {
      this.setState({
        isEditing: !this.state.isEditing
      });
    }

    this.handleSave = () => {
      console.log("TEST");
      console.log(this.state);
      this.props.onSave({
        id: this.state.id,
        name: this.state.name,
        employees: this.state.employees,
        revenue: this.state.revenue
      });
      this.handleEdit();
    }
	}
  render() {
    let {item} = this.props
    if (this.state.isEditing){
      return (
        <div>
          <input type="text" id="name" name="name" onChange={(e) => this.handleChange(e)} />
          <input type="text" id="employees" name="employees" onChange={(e) => this.handleChange(e)} />
          <input type="text" id="revenue" name="revenue" onChange={(e) => this.handleChange(e)} />

          <input type="button" value="save"  onClick={this.handleSave}/>
          <input type="button" value="cancel" onClick={this.handleEdit} />						
        </div>
      )
    }
    else{
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input type="button" value="edit" onClick={this.handleEdit}/>        
        </div>
      )
    }
  }
}

export default Company
