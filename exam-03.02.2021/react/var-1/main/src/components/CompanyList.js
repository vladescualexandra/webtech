import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company'

class CompanyList extends Component {
	constructor(){
		super()
		this.state = {
			companies : []
		}
		
		this.handleSave = (comp) => {
			console.log("TEST LIST");
			console.log(comp);
			this.store = new CompanyStore();
			this.store.saveOne(comp.id, {
				id: comp.id,
				name: comp.name,
				employees: comp.employees,
				revenue: comp.revenue
			});
			console.log(this.store.companies);
			this.setState({
				companies: this.store.getAll()
			});
			this.store.emitter.emit('UPDATE', () => {
				this.setState({
					companies: this.store.getAll()
				});
			});
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
    return (
      <div>
		  {this.state.companies.map((comp, index) => <Company 
														  key={index} 
														  item={comp} 
														  onSave={this.handleSave} /> )}
      </div>
    )
  }
}

export default CompanyList
