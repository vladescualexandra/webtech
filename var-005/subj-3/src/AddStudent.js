import React from 'react';

export class AddStudent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            surname: '',
            age: ''
        };
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addStudent = () => {
        let student = {
            name: this.state.name,
            surname: this.state.surname,
            age: this.state.age
        };
        this.props.onAdd(student);
    }

    render(){
        return (
            <div>
                <input type="text" id="name" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="surname" 
                    onChange={(e) => this.handleChange(e)} />
                <input type="text" id="age" 
                    onChange={(e) => this.handleChange(e)} />

                <input type="button" value="add student" 
                    onClick={this.addStudent}/>
            </div>
        )
    }
}