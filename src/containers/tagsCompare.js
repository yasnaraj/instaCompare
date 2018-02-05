import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-chartkick';

import * as tagsCountActions from '../store/tagsCount/tagsCountActions';
import InstaTags from './instaTags';
import Ranking from './ranking';

window.Chart = require('chart.js');
window.Highcharts = require('highcharts');

class TagsCompare extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCount: 2,
            tagItems: ['TagItem1', 'tagItem2'],
            currentInstaItem: '',
            morePopular: undefined,
            leastPopular: undefined,
            dispatched: false,
            graphData: undefined,
            sortedData: undefined,
        }
        this.onChange = this.onChange.bind(this);
        this.generateInstaTags = this.generateInstaTags.bind(this);
        this.setIndividualTagState = this.setIndividualTagState.bind(this);
        this.dispatchItem = this.dispatchItem.bind(this);
        this.compare = this.compare.bind(this);
    }

    onChange(e){
        this.setState({tagItems: []});
        this.setState({selectedCount: e.target.value, 
            morePopular: undefined, 
            leastPopular: undefined, 
            graphData: undefined,
            sortedData: undefined});
        for(var i = 0; i< this.state.tagItems.length; i++){
            var key = this.state.tagItems[i];
            var val = undefined;
            var obj  = {}
            obj[key] = val
            this.setState(obj);
        }
        var arr = [];
        for(var j = 0; j < e.target.value; j++){
            arr.push('TagItem' + j+1);
        }
        this.setState({tagItems: arr});
    }

    generateInstaTags(instaTagItem){
        return <InstaTags key = {instaTagItem} 
        instaItem={instaTagItem} 
        dispatchItem={this.dispatchItem} 
        totalCount={this.state[instaTagItem]}
        onNotDispatch={() => this.setState({dispatched: false})}/>
    }

    setIndividualTagState(key, value){
        var obj  = {}
        obj[key] = value
        this.setState(obj);
    }

    dispatchItem(tagName, item){
        var _this = this;
        this.props.dispatch(tagsCountActions.GetFeedCountByTag(tagName)).then(
            function(){
                _this.setState({dispatched: 'true'});
            }
        );
        this.setState({currentInstaItem: item});
    }

    compare(){
            if(this.state[this.state.tagItems[0]]){
                var morePopular = this.state[this.state.tagItems[0]].name;
                var morePopularCount = this.state[this.state.tagItems[0]].media_count;
                var leastPopular = this.state[this.state.tagItems[0]].name;
                var leastPopularCount = this.state[this.state.tagItems[0]].media_count;
            }else{
                alert('Please fill the first item');
                return;
            }

            var graphData = [];
            var sortData = [];
            
            for(var i = 0; i< this.state.tagItems.length; i++){
                var tagItem = this.state[this.state.tagItems[i]];
                var item = [];
                item.push(tagItem.name);
                item.push(tagItem.media_count);
                
                sortData.push(tagItem);

                graphData.push(item);
                if(tagItem){
                    var count = tagItem.media_count;
                    if(morePopularCount < count){
                        morePopular = this.state[this.state.tagItems[i]].name;
                        morePopularCount = this.state[this.state.tagItems[i]].media_count;
                    }else if(count < leastPopularCount){
                        leastPopular = this.state[this.state.tagItems[i]].name;
                        leastPopularCount = this.state[this.state.tagItems[i]].media_count;
                    }
                }else{
                    alert('Please remember to fill all details');
                }
                
            }

            var sorted = sortData.slice().sort(function(a,b){
                return b.media_count - a.media_count
            })


            this.setState({morePopular: morePopular, leastPopular: leastPopular, graphData: graphData, sortedData: sorted});
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.tagsCount){
            this.setIndividualTagState(this.state.currentInstaItem, nextProps.tagsCount.tagCount);
        }
    }

    render() {
        var data = [2, 3, 4, 5, 6, 7, 8, 9, 10]
            
        var makeItem = function(x){
        return <option key={x}> {x} </option>
        }

        return (
        <div className="bodyContainer">
            <label className="compHeader"> How many tags do you want to compare? </label>
            <select className="form-control tagddl" value={this.state.selectedCount} onChange={this.onChange}>
            {data.map(makeItem)}
            </select>

            <div className="tagsItem">
            {this.state.tagItems.map(this.generateInstaTags)}
            </div>

            <div className="row" style={{width: '100%'}}>
            <button className="btn btn-success btnCompare" onClick={this.compare} disabled={!this.state.dispatched}> Compare </button>
            </div>

            <div className="row popularArea">
            <div className="col-lg-1 "></div>
            {this.state.morePopular ? <div className="popular col-sm-5 col-md-5 col-lg-4 floatLeft" style={{margin: '20px'}}> 
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 floatLeft">
                        <h2><i className="fa fa-thumbs-up"></i></h2></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 floatLeft" style={{marginTop: '-10px'}}> 
                        <b className="compHeader">{this.state.morePopular}</b> 
                        <div>More Popular</div> </div>
                     </div> : 
                null}
            {this.state.leastPopular ? <div className="notPopular col-sm-5 col-md-5 col-lg-4 floatLeft" style={{margin: '20px'}}> 
                    <div className="col-xs-4  col-sm-2 col-md-4 col-lg-4 floatLeft"><h2><i className="fa fa-thumbs-down"></i></h2></div>
                        <div className="col-sm-8 col-md-8 col-lg-8 floatLeft" style={{marginTop: '-10px'}}> 
                        <b className="compHeader">{this.state.leastPopular}</b> 
                        <div>Less Popular</div> </div>
                     </div> : 
                     null}
            </div>

            <div className="infoArea floatLeft">
                {this.state.sortedData ? <div className="rankingArea col-md-3 col-lg-3">
                    <Ranking sortedData = {this.state.sortedData}/>
                    </div> : null}
                {this.state.graphData ? <div className="graphArea col-md-8 col-lg-8">
                    <b className="compHeader" style={{textAlign: 'left'}}>Pie Chart </b>
                    <PieChart data={this.state.graphData} donut={true} />
                    </div>
                : null}
            </div>
            
            
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

export default connect(mapStateToProps)(TagsCompare);