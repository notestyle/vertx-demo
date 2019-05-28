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
                console.log('Response: ', data.data);

                this.setState(state => {
                    let newData = this.state.datas;
                    
                    data.data.map(x=>{
                        newData.push({
                            id: x.id,
                            name: x.first_name,
                            lastName: x.last_name,
                            role: x.avatar,
                            createdDate: (new Date()).toDateString()
                        })
                    });
                    return {
                        newData
                    };
                });
                
                this.props.enqueueSnackbar('Getting data.', { variant: 'success'});
                this.setState({isConnected : true});
            }catch(err){
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