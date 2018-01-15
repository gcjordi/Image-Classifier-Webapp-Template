import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import './App.css';
import { CircularProgress } from 'material-ui/Progress';
import { LinearProgress } from 'material-ui/Progress';
import Button from 'material-ui/Button';
import $ from 'jquery'

var classifier_api = "https://classifierapi.herokuapp.com/"
// var classifier_api = "http://localhost:8000/"

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  progress: {
    margin: `0 ${theme.spacing.unit * 2}px`,
  },
});

class App extends Component {

  constructor(){
    super();
    this.state = {
      upload_percent: 0,
      encoded_image: null,
      image_name: null,
      classifying: false
    }
  };

  openfile = (e) => {
    let t = this
    var image = e.target.files[0]
    this.setState({image_name: image.name})
    
    var reader = new FileReader();
    
    reader.readAsDataURL(image);

    reader.onprogress = function(e){
      var percent = Math.round((e.loaded / e.total) * 100)
      t.setState({upload_percent : percent});
    };

    reader.onload = function(){
      t.setState({encoded_image: reader.result})
    };

    reader.onloadend = function(){
      t.setState({upload_percent: 100})
    };
  };

  sendimage = (e) => {
    let t = this
    this.setState({classifying: true})
    $.ajax({url: classifier_api,
            type: 'POST',
            data: {filename: this.state.image_name, data: this.state.encoded_image},
            success: function(data){
              t.setState({
                classifying: false
              })
            },
    })
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <LinearProgress mode="determinate" value={this.state.upload_percent} />
        <input type='file' accept='image/*' onChange={this.openfile} />
        <Button color="primary" raised className={classes.button} onClick={this.sendimage}>SUBMIT</Button>
        {
          this.state.classifying?<CircularProgress className={classes.progress}/>:null
        }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);