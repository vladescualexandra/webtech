import React, { Component } from 'react'

// TODO : adăugați posibilitatea de a edita un robot 
// editarea se face prin intermediul unui robot cu 2 stări, una de vizualizare și una de editare

// TODO : add the posibility to edit a robot 
// editing is done via 2 states a view state and an edit state

class Robot extends Component {
	constructor(props){
		super(props);
		this.state = {
			id: this.props.id,
			name: this.props.name,
			type: this.props.type,
			mass: this.props.maps,
			isEditing: false
		}

		this.handleChange = (e) => {
			this.setState({
				[e.target.id]: e.target.value
			});
		}

		this.edit = () => {
			this.setState({
				isEditing: !this.state.isEditing
			});
		}

		this.handleSave = () => {
			console.log(this.state);
			this.props.onSave(this.state.id, {
				id: this.state.id,
				name: this.state.name,
				type: this.state.type,
				mass: this.state.mass
			});

			this.setState({
				isEditing: !this.state.isEditing
			});
		}

		this.handleCancel = () => {
			this.setState({
				isEditing: !this.state.isEditing
			});
		}
	} 
	render() {
		let {item} = this.props
		if (this.state.isEditing) {
			return(
				<div>
					<input type="text" id="name" name="name"
						onChange={(e) => this.handleChange(e)}/>
					<input type="text" id="type" name="type"
						onChange={(e) => this.handleChange(e)}/>
					<input type="text" id="mass" name="mass"
						onChange={(e) => this.handleChange(e)}/>
					<input type="button" value="save"
						onClick={this.handleSave} />
					<input type="button" value="cancel"
						onClick={this.handleCancel} />
					
				</div>
			)
		} else {
			return (
				<div>
					Hello, my name is {item.name}. I am a {item.type} and weigh {item.mass}
					<input type="button" value="edit" onClick={this.edit} />
				</div>
			)
		}
		
	}
}

export default Robot
