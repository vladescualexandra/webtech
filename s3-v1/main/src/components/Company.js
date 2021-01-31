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

    this.edit = () => {
      this.setState({
        isEditing: !this.state.isEditing
      });      
    }

    this.save = () => {
      this.props.onSave(this.state);
      this.edit();
    }
  }
  

  render() {
    let {item} = this.props
    if (this.state.isEditing){
      return (
        <div>
          <input id="name" type="text" placeholder={this.state.name} 
              onChange={e => this.handleChange(e)}/>
          <input id="employees" type="text" placeholder={this.state.employees} 
              onChange={e => this.handleChange(e)}/>
          <input id="revenue" type="text" placeholder={this.state.revenue} 
              onChange={e => this.handleChange(e)}/>
          <input type="button" value="save"  onClick={this.save} />
          <input type="button" value="cancel" onClick={this.edit} />						
        </div>
      )
    }
    else{
      return (
        <div>
          Name {item.name} with {item.employees} employees {item.revenue} revenue
          <input type="button" value="edit" onClick={this.edit}/>        
        </div>
      )
    }
  }
}

export default Company
