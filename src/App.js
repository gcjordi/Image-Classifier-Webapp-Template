import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {upload} from './api'

const input_style = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      loading:false,
      snackbar:false,
      image:null,
      prediction:'Select an image to see what it holds',
      preview:'nn.png',
    }
    this.updatePred = this.updatePred.bind(this)
  }
  
  selectImage(file_name) {
    let t = this;
    var reader = new FileReader();
    reader.readAsDataURL(file_name);
    reader.onload = (e) => {
      let imagedata = e.target.result
      t.setState({prediction:'Analyzing...',
                  preview: imagedata,
                  loading:true})
      let b64img = imagedata.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      upload(b64img, this.updatePred)
    }
  }

  updatePred(pred){
    this.setState({prediction: pred,
                   loading: false})
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div className='flex-container'>
            <Card>
              <CardMedia className='image-container'>
                <img src={this.state.preview} alt=""/>
              </CardMedia>
              <CardTitle title={this.state.prediction}/>
              <CardActions>
                <RaisedButton
                  className='button'
                  primary={true}
                  label="Choose an Image"
                  containerElement="label">
                    <input style={input_style} type="file" accept="image/*" onChange={(e) => this.selectImage(e.target.files[0])}/>
                </RaisedButton>
              </CardActions>
              {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
            </Card>
          </div>
          <Snackbar
            open={this.state.snackbar}
            message='Bad image'
            autoHideDuration={4000}
            onRequestClose={() => this.setState({snackbar:false})}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
