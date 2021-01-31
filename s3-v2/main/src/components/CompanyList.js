import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company'
import CompanyDetails from './CompanyDetails'

class CompanyList extends Component {
	constructor(){
		super()
		this.state = {
			companies : [],
		}

		this.handleSelect = (item) => {
			this.setState({
				selected: item
			})
		}

		this.handleCancel = () => {
			this.setState({
				selected: null
			})
		}
		
	}
	componentDidMount(){
		this.store = new CompanyStore()
		this.setState({
			companies : this.store.getAll()
		})
		this.store.emitter.addListener('UPDATE', () => {
			this.setState({
				companies : this.store.getAll()
			})			
		})
	}
  render() {
	if (this.state.selected){
		return (
			<div>
			  <CompanyDetails item={this.state.selected} onCancel={this.handleCancel}/>
			</div>
		  )
	}
	else{
		return (
		  <div>
			{
				this.state.companies.map((el, i) => 
					<Company item={el} key={i} onSelect={this.handleSelect}/>
				)
			}
		  </div>
		)
	}
  }
}

export default CompanyList
