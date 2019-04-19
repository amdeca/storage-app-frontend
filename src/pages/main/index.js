import React, {Component} from 'react';
import api from '../../api/api';

//Styles and logo
import logo from '../../assets/logo.svg'
import './styles.css';

export default class Main extends Component{
    state = { newStorage: "", };

    formSubmission = async event => {
        event.preventDefault();
        const response = await api.post('storage/', {
            title: this.state.newStorage
        });
        //Redirects to /storage/:id URL
        this.props.history.push(`/storage/${response.data._id}`);
    };

    inputChange = event => {
        this.setState({ newStorage: event.target.value });
    };

    render(){
        return (
            <div id="main-container">
                <form onSubmit={this.formSubmission}>
                    <img src={logo} alt=""></img>
                    <input placeholder="Create a Storage Box" value={this.state.newStorage} onChange={this.inputChange} />
                    <button type="submit">Create</button>
                </form>
            </div>
        );
    }
}