import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import LinearProgress from 'material-ui/LinearProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
  buttonwrapper: {
    verticalAlign: 'middle',
  },
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
    }
  
  selectImage(id) {
      let t = this;
      var reader = new FileReader();
      reader.readAsDataURL(id.target.files[0]);
      // var image = id.target.files[0];
      // var name = image.name;
      console.log('select image triggered')
      reader.onload = function(el) {
          var imagedata = el.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
          console.log('image read: ', imagedata)
          t.setState({prediction:'Analyzing...',
                      preview: el.target.result,
                      loading:true})
          fetch("http://classifierapi.apps.sdhnshu.com",
                {method: 'POST',
                 body: JSON.stringify({ image: imagedata }),
                }).then(function(resp){
                  console.log('first then')
                  console.log(t.state)
                if(resp.status === 200)
                  {return resp.json()}
                else
                  console.log('else')
                  console.log(t.state)
                  t.setState({loading: false,
                              snackbar: true,
                              prediction: 'Please select another image'})
                  console.log(t.state)
                }).catch(function(error) {
                    console.log(error);
                }).then((body)=>{
                  console.log('second then')
                  console.log(t.state)
                  t.setState({prediction: body.resp_data,
                              loading: false})
                  console.log(t.state)
                }).catch(function(error) {
                    console.log(error);
                })
      }
    }

  closeSnackbar(){
    console.log('close Snackbar')
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
                <FlatButton
                  style={styles.buttonwrapper}
                  primary={true}
                  label="Choose an Image"
                  containerElement="label">
                    <input style={styles.imageinput} type="file" accept="image/*" onChange={this.selectImage.bind(this)} />
                </FlatButton>
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
