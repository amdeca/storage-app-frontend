import React, {Component} from 'react';
import logo from '../../assets/logo.svg';
import './styles.css';
import {FaCloudUploadAlt} from 'react-icons/fa';
import {distanceInWords} from 'date-fns';
import api from '../../api/api';
import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

export default class Storage extends Component{
    state = { storage : {} } 

    async componentDidMount(){
        this.newFilesNotification();

        const storage = this.props.match.params.id;
        const response = await api.get(`storage/${storage}`);
        this.setState( {storage: response.data });
    }

    newFilesNotification = () => {
        const storage = this.props.match.params.id;
        const io = socket('https://node-storage-app.herokuapp.com');
        io.emit('connectRoom', storage);
        io.on('file', data => {
            this.setState({
                storage: {... this.state.storage, files: [data, ... this.state.storage.files]}
            });
            
        });
    };
    

    uploadFile = files => {
        files.forEach( file => {
            const data = new FormData();
            const storageId = this.props.match.params.id;
            data.append('file', file);
            api.post(`storage/${storageId}/files`, data);
        });
    };

    render(){
        return (
            <div id="storage-div">
                <header>
                    <img src={logo}/>
                    <h1>{this.state.storage.title}</h1>
                </header>

                <Dropzone onDropAccepted = {this.uploadFile}>
                    {( {getRootProps, getInputProps} ) => (
                        <div className="upload" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag your files here</p>
                        </div>
                    )}
                </Dropzone>

                <ul>
                    { this.state.storage.files && this.state.storage.files.map(file => 
                        (
                        <li key={file._id}>
                            <a className="fileDetails" href={file.url}>
                                <FaCloudUploadAlt size={30} color="#A5Cfff"/>
                                <strong>{file.title}</strong>
                            </a>
                            <span>{distanceInWords(file.createdAt, new Date() )} {" "}ago</span>
                        </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}