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
                let response = await fetch(`https://reqres.in/api/users?page=1`);
                let data = await response.json();
                let newData = this.state.datas;
                    
                data.data.forEach(x => {
                    newData.push({
                        id: x.id,
                        name: x.first_name,
                        lastName: x.last_name,
                        role: x.avatar,
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