import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import $ from 'jquery';

let APP_URL = 'https://img-classifier.herokuapp.com/identify'

const styles = {
  imageinput: {
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


export default class App extends Component {

  constructor() {
      super();
      this.state = {
        loading:false,
        snackbar:false,
        image:null,
        prediction:'Select an image to see what it holds',
        preview:'./static/nn.png',
      }
    this.apicall = this.apicall.bind(this)
    this.selectImage = this.selectImage.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
    }

  apicall(imagedata) {
   return $.ajax({
      url: `${APP_URL}`,
      method: 'POST',
      data: JSON.stringify({ image: imagedata }),
      // headers: {
      //     'authorization': auth,
      //     'Content-Type': 'application/json',
      // },
    }).then((response, textStatus, xhr) => {
      return { response, status: xhr.status };
    }).catch((error) => {
      console.error(error.statusText , error.status);
    });
 }
  
  selectImage(id) {
      let t = this;
      var reader = new FileReader();
      reader.readAsDataURL(id.target.files[0]);
      // var image = id.target.files[0];
      // var name = image.name;

      reader.onload = function(el) {
          var imagedata = el.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
          
          t.setState({prediction:'Analyzing...',
                      preview: el.target.result,
                      loading:true})
          
          t.apicall(imagedata)
            .then(({ response, status }) => {
              if (status !== 200) {
                t.setState({loading: false,
                            snackbar: true,
                            prediction: 'Please select another image'})
              }
              else {
                t.setState({loading: false,
                            prediction: response.resp_data})
              }
            })
            .catch(err => {
              console.error(err.message);
            })
      }
    }

  closeSnackbar(){
    this.setState({snackbar:false})
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
                <RaisedButton
                  class='button'
                  primary={true}
                  label="Choose an Image"
                  containerElement="label">
                    <input style={styles.imageinput} type="file" accept="image/*" onChange={this.selectImage} />
                </RaisedButton>
              </CardActions>
              {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
            </Card>
          </div>
          <Snackbar
            open={this.state.snackbar}
            message='Bad image'
            autoHideDuration={4000}
            onRequestClose={this.closeSnackbar}/>
        </div>
      </MuiThemeProvider>
    );
  }
}