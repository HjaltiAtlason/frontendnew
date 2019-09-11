import React, {Component} from 'react'
import {Button } from 'react-bootstrap';
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'
import ShowFiles from './ShowFiles';
import { saveSentFileToStore } from '../../actions/borrowerActions';


class UploadFile extends Component {
  constructor() {
    super();
    this.state = {
      selectedFile: null,
      speed: 'fatækur'
    }
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }
  componentDidMount() {    
    const rootRef = firebase
            .database()
            .ref()
    const speedRef = rootRef.child('alli');  // Alli is set in the firebase->Database->Data sheet

    speedRef.on('value', (snap) => {
      this.setState({
        speed: snap.val()
      })
    })

    const rootIm = firebase
            .storage()
            .ref('vinnslu')
  }

  fileSelectedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }
  fileUploadHandler = (event) => {
    const name = `vinnslu/${`${this.props.firstName  }_${  this.state.selectedFile.name}`}`
    this.props.dispatch(saveSentFileToStore(name));
    console.log(name)
    const rootfileref = firebase
            .storage()
            .ref(name)
    const uploadTask = rootfileref.put(this.state.selectedFile)

    uploadTask.on('state_changed', (snapshot) => {
            // Observe state change events such as progress, pause, and resume Get task
            // progress, including the number of bytes uploaded and the total number of
            // bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
            // Handle unsuccessful uploads
    }, () => {
            // Handle successful uploads on complete For instance, get the download URL:
            // https://firebasestorage.googleapis.com/...
      uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then((downloadURL) => {
                  console.log('File available at', downloadURL);
                });
      this.setState({selectedFile: null})
    });

  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.fileSelectedHandler} />
        {this.state.selectedFile ? (
          <Button
            onClick={this.fileUploadHandler} 
            type="submit"
            bsSize="large"
            variant="primary"
          >Senda skrá</Button>
        ) : null }
        <ShowFiles />
      </div>
    );
  }
}

// <h4>{this.state.speed}</h4>  shows the database data structure
export default UploadFile;