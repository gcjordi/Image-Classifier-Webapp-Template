import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  uploadButton: {
    verticalAlign: 'middle',
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class App extends Component {

  constructor() {
      super();
      this.state = {
        loading:false,
        snackbar:false,
        image:null,
        prediction:'Upload an image to see what it holds',
        preview:null,
      }
    }
  
  selectImage(id) {
      let t = this;
      var reader = new FileReader();
      reader.readAsDataURL(id.target.files[0]);
      // var yoyoimage = id.target.files[0];
      // var yoyoname = yoyoimage.name;
      reader.onload = function(el) {
          var imagedata = el.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
          t.setState({image:imagedata,
                      preview: el.target.result})
      }
    }

  closeSnackbar(){
    this.setState({snackbar:false})
  }

  sendImage(){
    this.setState({loading:true})
    let t = this;
    fetch("http://127.0.0.1:8000",
      {method: 'POST',
       body: JSON.stringify({ image: t.state.image }),
      }).then(function(resp){

        if(resp.status === 200)
          {return resp.json()}
        else
          t.setState({loading: false,
                      snackbar: true,})
      }).then((body)=>{
        t.setState({prediction: body.resp_data,
                    loading: false})
      })
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div class='flex-container'>
            <Card>
              <CardMedia class='image-container'>
                <img src={this.state.preview} alt=""/>
              </CardMedia>
              <CardTitle title={this.state.prediction}/>
              <CardActions>
                <FlatButton
                  style={styles.uploadButton}
                  primary={true}
                  label="Choose an Image"
                  containerElement="label">
                    <input style={styles.exampleImageInput}  type="file" accept="image/*" onChange={this.selectImage.bind(this)} />
                </FlatButton>
                <FlatButton label="Send" primary={true} onClick={this.sendImage.bind(this)} />
              </CardActions>
              {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
            </Card>
          </div>
          <Snackbar
            open={this.state.snackbar}
            message='Bad image'
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar.bind(this)}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
