import React from 'react';
import { AddStudent } from './AddStudent';

export class StudentList extends React.Component {
    constructor(){
        super();
        this.state = {
            students: []
        };

        this.handleAdd = (student) => {
            let studs = this.state.students;
            studs.push(student);

            this.setState({
                students: studs
            });
        }
    }

    render(){
        return (
            <div>
                <AddStudent onAdd={this.handleAdd} />
            </div>
        )
    }
}

export default StudentList;