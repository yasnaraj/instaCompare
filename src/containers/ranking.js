import React, { Component } from 'react';

class Ranking extends Component {
    constructor(props){
        super(props);
        this.state = {
            tagName: ''
        }
    }

    componentDidMount(){
        this.setState({tagName: ''});
    }


  render() {
      var makeList = function(x){
        var mediaCount = x.media_count.toLocaleString();
        
        return <li key={x.name}> {x.name} - {mediaCount} </li>
        }

    return (
      <div className="floatLeft marginTop">
      <b className="compHeader" style={{textAlign: 'left'}}>Ranking </b>

        <ol style={{textAlign: 'left'}}>
            {this.props.sortedData.map(makeList)}
        </ol>

      </div>
    );
  }
}


export default (Ranking);