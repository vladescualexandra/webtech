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
	}
	else{
		return (
		  <div>
			{
				this.state.companies.map((e, i) => 
					<Company item={e} key={i} />
				)
			}
		  </div>
		)
	}
  }
}

export default CompanyList
