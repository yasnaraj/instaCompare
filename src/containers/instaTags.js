import React, { Component } from 'react';
import { connect } from 'react-redux';

class InstaTags extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagName: ''
        }
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    onBtnClick(){
        // dispatch to get the hashtag detail
        this.props.dispatchItem(this.state.tagName, this.props.instaItem);
        
    }

    componentDidMount(){
        this.setState({tagName: ''});
    }

  render() {
    return (
      <div className="col-sm-4 col-md-4 col-lg-3 floatLeft marginTop">
      <div className="row">
          <i className="fa fa-hashtag floatLeft marginTop"> </i>
          <input type="text" className="form-control tagInput col-xs-10 col-sm-11 col-md-11 col-lg-11 floatLeft" 
          placeholder="Hashtag" value={this.state.tagName} onChange={(e) => this.setState({tagName: e.target.value})} 
          onBlur={this.onBtnClick} onFocus = {this.props.onNotDispatch}/>
      </div>
          {this.props.obj ? <span className="mediaCount"> Total Count: {this.props.obj.media_count.toLocaleString()} </span>: 
        <span className="mediaCount">... </span>}

      </div>
    );
  }
}

function mapStateToProps(state) {
    var { tagsCount }  = state
     return {
        tagsCount
     };
   }

export default connect(mapStateToProps)(InstaTags);