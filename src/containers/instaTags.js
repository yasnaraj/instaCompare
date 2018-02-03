import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as tagsCountActions from '../store/tagsCount/tagsCountActions';

class InstaTags extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagName: ''
        }
        this.onBtnClick = this.onBtnClick.bind(this);
    }

    onBtnClick(){
        //this.props.dispatch(tagsCountActions.GetFeedCountByTag(this.state.tagName));
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
          <input type="text" className="form-control tagInput col-xs-11 col-sm-11 col-md-11 col-lg-11 floatLeft" 
          placeholder="Hashtag" value={this.state.tagName} onChange={(e) => this.setState({tagName: e.target.value})} 
          onBlur={this.onBtnClick} onFocus = {this.props.onNotDispatch}/>
      </div>
          {this.props.totalCount ? <span className="mediaCount"> {this.props.totalCount.media_count} </span>: 
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