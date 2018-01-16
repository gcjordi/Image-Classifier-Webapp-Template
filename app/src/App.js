import React, { Component } from 'react';
import './App.css';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
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
          image:null,
          resp_img:null,
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

  sendImage(){
    this.setState({loading:true})
    let t = this;
    fetch("http://127.0.0.1:8000",
      {method: 'POST',
       body: JSON.stringify({ image: t.state.image }),
      }).then(function(resp){
       return resp.json();
      }).then((body)=>{
        t.setState({resp_img: body.resp_data,
                    loading: false})
      })
  }

  render() {
    return (
      <MuiThemeProvider>
          <div>
          <Card>
            <CardMedia >
              <img src={this.state.preview} alt=""/>
            </CardMedia>
            <CardTitle title="Classifier"/>
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
          </Card>
            
            {this.state.loading ? <LinearProgress mode="indeterminate" /> : null}
            
          </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
