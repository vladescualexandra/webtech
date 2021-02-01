import React, { Component } from 'react'
import RobotStore from '../stores/RobotStore'
import Robot from './Robot'

// TODO : adăugați o componentă Robot 
// afișați o componentă Robot pentru fiecare robot din stare 
// o componentă robot ar trebui să afișeze un robot și să permită ștergerea lui


class RobotList extends Component {
	constructor(){
		super()
		this.state = {
			robots : []
		}
		this.deleteRobot = (id) => {
			this.store.deleteRobot(id)
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
      	{
			this.state.robots.map((item, index) => <Robot key={index} item={item} onDelete={this.deleteRobot}/>)
      	}
      </div>
    )
  }
}

export default RobotList
