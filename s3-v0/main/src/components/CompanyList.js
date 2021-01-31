import React, { Component } from 'react'
import CompanyStore from '../stores/CompanyStore'
import Company from './Company';

class CompanyList extends Component {
	constructor(){
		super()
		this.state = {
			companies : []
		}

		this.handleDelete = (id) => {
			this.store = new CompanyStore();
			this.store.deleteOne(id);
			this.setState({
				companies : this.store.getAll()
			})
			this.store.emitter.addListener('UPDATE', () => {
				this.setState({
					companies : this.store.getAll()
				})			
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
    return (
      <div>
		  {this.state.companies.map((el, index) => <Company key={index} item={el} onDelete={this.handleDelete}/>)}
      </div>
    )
  }
}

export default CompanyList;
