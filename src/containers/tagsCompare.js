import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-chartkick';

import * as tagsCountActions from '../store/tagsCount/tagsCountActions';
import InstaTags from './instaTags';
import Ranking from './ranking';

window.Chart = require('chart.js');
window.Highcharts = require('highcharts');

class TagsCompare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCount: 2,
            tagItems: [{item: 'TagItem1', value: null}, 
                        {item: 'tagItem2', value: null}],
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

    onChange(e) {
        // on change of the hashtags the use wants to compare
        this.setState({
            selectedCount: e.target.value,
            morePopular: undefined,
            leastPopular: undefined,
            graphData: undefined,
            sortedData: undefined
        });

        // generate new hashtag objects
        var arr = [];
        for (var j = 0; j < e.target.value; j++) {
            arr.push({item: 'TagItem' + j + 1, value: null});
        }
        this.setState({ tagItems: arr });
    }

    generateInstaTags(instaTagItem) {
        return <InstaTags key={instaTagItem.item}
            instaItem={instaTagItem.item}
            dispatchItem={this.dispatchItem}
            obj={instaTagItem.obj}
            onNotDispatch={() => this.setState({ dispatched: false })} />
    }

    setIndividualTagState(key, value) {
        // after the dispatch is done to fetch the hastag detail, add the detail to the existing tag item as an obj
        var newTagItems = this.state.tagItems;
        var objIndex = newTagItems.findIndex((obj => obj.item == key));
        newTagItems[objIndex].obj = value;
        this.setState({tagItems: newTagItems});
    }

    dispatchItem(tagName, item) {
        // dispatch the action that makes service call to fetch the hashtag detail
        var _this = this;
        this.props.dispatch(tagsCountActions.GetFeedCountByTag(tagName)).then(
            function () {
                _this.setState({ dispatched: 'true' });
            }
        );
        this.setState({ currentInstaItem: item });
    }

    compare() {
        // code to compare the hashtag counts of the entered hashtags
        if (this.state.tagItems[0].obj) {
            var morePopular = this.state.tagItems[0].obj.name;
            var morePopularCount = this.state.tagItems[0].obj.media_count;
            var leastPopular = this.state.tagItems[0].obj.name;
            var leastPopularCount = this.state.tagItems[0].obj.media_count;
        } else {
            alert('Please fill the first item or maybe there are no such hastags!');
            return;
        }

        var graphData = [];
        var sortData = [];

        for (var i = 0; i < this.state.tagItems.length; i++) {
            var tagItem = this.state.tagItems[i].obj;
            if(tagItem === undefined){
                alert("Maybe there are no such hashtags for the hashtag in position " + (parseInt(i) + 1) + ". Please try changing it and see the result,");
                return;
            }
            var item = [];
            item.push(tagItem.name);
            item.push(tagItem.media_count);

            sortData.push(tagItem);

            graphData.push(item);
            if (tagItem) {
                var count = tagItem.media_count;
                if (morePopularCount < count) {
                    morePopular = this.state.tagItems[i].obj.name;
                    morePopularCount = this.state.tagItems[i].obj.media_count;
                } else if (count < leastPopularCount) {
                    leastPopular = this.state.tagItems[i].obj.name;
                    leastPopularCount = this.state.tagItems[i].obj.media_count;
                }
            } else {
                alert('Please remember to fill all details');
            }

        }

        // sort the data in ascending order for ranking
        var sorted = sortData.slice().sort(function (a, b) {
            return b.media_count - a.media_count
        })


        this.setState({ morePopular: morePopular, leastPopular: leastPopular, graphData: graphData, sortedData: sorted });

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tagsCount) {
            this.setIndividualTagState(this.state.currentInstaItem, nextProps.tagsCount.tagCount);
        }
    }

    render() {
        var data = [2, 3, 4, 5, 6, 7, 8, 9, 10]

        var makeItem = function (x) {
            return <option key={x}> {x} </option>
        }

        return (
            <div className="bodyContainer">


                <div className="alert alert-info centerAlign">
                    <strong><i className="fa fa-info-circle"></i> Compare between various instagram hashtags!</strong> <br />
                    Select the number of hashtags you wish to compare and enter them to see which ones are popular than the other!
                </div>
                <div className="mainBody">
                    <div className="row tagsItem">
                        <label className="compHeader"> How many hashtags do you want to compare? </label>
                        <div>
                            <select className="form-control tagddl" value={this.state.selectedCount} onChange={this.onChange}>
                                {data.map(makeItem)}
                            </select>
                        </div>

                    </div> 
                </div>

                <div id="tagArea" className="jumbotron">
                    <div className="tagsItem">
                        {this.state.tagItems.map(this.generateInstaTags)}
                    </div>

                    <div className="row" style={{ width: '100%', marginTop: '-30px' }}>
                        <button className="btn btn-success btnCompare" onClick={this.compare} disabled={!this.state.dispatched}> Compare </button>
                    </div>
                </div>

                {this.state.morePopular ? <div className="result">
                <div className="row popularArea">
                        <div className="col-lg-1 "></div>
                        {this.state.morePopular ? <div className="popular col-sm-5 col-md-5 col-lg-4 floatLeft" style={{ margin: '20px' }}>
                            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 floatLeft">
                                <h2><i className="fa fa-thumbs-up"></i></h2></div>
                            <div className="col-sm-8 col-md-8 col-lg-8 floatLeft" style={{ marginTop: '-10px' }}>
                                <b className="compHeader">{this.state.morePopular}</b>
                                <div>More Popular</div> </div>
                        </div> :
                            null}
                        {this.state.leastPopular ? <div className="notPopular col-sm-5 col-md-5 col-lg-4 floatLeft" style={{ margin: '20px' }}>
                            <div className="col-xs-4  col-sm-2 col-md-4 col-lg-4 floatLeft"><h2><i className="fa fa-thumbs-down"></i></h2></div>
                            <div className="col-sm-8 col-md-8 col-lg-8 floatLeft" style={{ marginTop: '-10px' }}>
                                <b className="compHeader">{this.state.leastPopular}</b>
                                <div>Less Popular</div> </div>
                        </div> :
                            null}
                    </div>

                    <div className="tagsItem">
                        {this.state.sortedData ? <div className="rankingArea">
                            <Ranking sortedData={this.state.sortedData} />
                        </div> : null}
                        {this.state.graphData ? <div className="graphArea">
                            <b className="compHeader" style={{ textAlign: 'left' }}>Pie Chart </b>
                            <PieChart data={this.state.graphData} donut={true} />
                        </div>
                            : null}
                    </div>
                </div> : null}

                    


            </div>
        );
    }
}

function mapStateToProps(state) {
    var { tagsCount } = state
    return {
        tagsCount
    };
}

export default connect(mapStateToProps)(TagsCompare);