import React from 'react';
import AddDevice from './AddDevice';

class DeviceList extends React.Component {
    constructor(){
        super();
        this.state = {
            devices: []
        };
    }   
    
    handleAdd = (item) => {
        let devs = this.state.devices;
        devs.push(item);

        this.setState({
            devices: devs
        })

    }
  
    render(){
        return (
            <div>
                <AddDevice onAdd={this.handleAdd}/>
            </div>
        )
    }
}

export default DeviceList;