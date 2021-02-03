import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

// TODO: adăugați posibilitatea de a filtra roboții după name și type
// filtrarea se face pe baza a 2 text input-uri și se produce la fiecare tastă apăsată

// TODO: add the possiblity to filter robots according to name and type
// filtering is done via 2 text inputs and happens whenever a key is pressed

class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : [],
			nameFilter: '',
			typeFilter: ''
		}
	}


	handleChange = (e, id) => {
		this.setState({
			[id]: e.target.value
		});

		console.log(this.state.nameFilter, this.state.typeFilter);

		if (this.state.nameFilter === '' && this.state.nameFilter === '') {
			this.setState({
				robots : this.store.getRobots()
			});	
		} else if (this.state.nameFilter !== ''
					&& this.state.typeFilter === '') {

			let rbts = this.state.robots.filter((e) => e.name === this.state.nameFilter); 
			this.setState({
				robots : rbts
			});	

		} else if (this.state.nameFilter === ''
					&& this.state.typeFilter !== '') {

			let rbts = this.state.robots.filter((e) => e.name === this.state.typeFilter); 
			this.setState({
				robots : rbts
			});	

		} else {

			let rbts = this.state.robots.filter((e) => e.name === this.state.nameFilter);
			rbts = rbts.filter((e) => e.type === this.state.typeFilter); 
			this.setState({
				robots : rbts
			});	

		}

		
	}

	componentDidMount(){
		this.store = new RobotStore()
		this.setState({
			robots : this.store.getRobots()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				robots : this.store.getRobots()
			})			
		})
	}
	render() {
		return (
			<div>
				<input type="text" id="nameFilter" name="nameFilter"
					onChange={(e) => this.handleChange(e, 'nameFilter')} />
				<input type="text" id="typeFilter" name="typeFilter" 
					onChange={(e) => this.handleChange(e, 'typeFilter')} />
				{
					this.state.robots.map((e, i) => 
						<Robot item={e} key={i} />
					)
				}
			</div>
		)
	}
}

export default RobotList
