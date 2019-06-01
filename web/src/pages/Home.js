import React, { Component } from 'react';

import Header from '../components/Header';
import DataTable from '../components/DataTable';

class Home extends Component {
    state = {
        datas: [],
        isConnected: false
    }

    setData = async() => {
        if(!this.state.isConnected){
            try{
                let response = await fetch(`http://localhost:8899/customers`);
                let data = await response.json();
                let newData = this.state.datas;
                
                // console.log(newData);
                data.forEach(x => {
                    newData.push({
                        id: x.id,
                        name: x.firstName,
                        lastName: x.lastName,
                        role: x.role,
                        createdDate: (new Date()).toDateString()
                    })
                });

                this.setState({datas: newData});
                
                this.props.enqueueSnackbar('Data downloaded.', { variant: 'success'});
                this.setState({isConnected : true});
            }catch(err){
                console.log(err);
                this.props.enqueueSnackbar('Error: ', err, { variant: 'error'});
                this.setState({isConnected : false});
            }
        }
        else{
            this.setState({ datas: []});
            this.setState({isConnected : false});
            this.props.enqueueSnackbar('Data cleared!', { variant: 'warning'});
        }
    }

    render() {
        return (
            <div>
                <Header isConnected={this.state.isConnected} setData={this.setData} />
                <DataTable datas={this.state.datas}/>
            </div>
        );
    }
}

export default Home;