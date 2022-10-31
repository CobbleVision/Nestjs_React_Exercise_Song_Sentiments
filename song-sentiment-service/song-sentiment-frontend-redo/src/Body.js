import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import SongSearch from "./body/SongSearch";
import SongSentimentResult from "./body/SongSentimentResult.js";
import LowestSentimentSongs from './body/LowestSentimentSongs';
import HighestSentimentSongs from './body/HighestSentimentSongs';

import songSentimentService from './songSentimentService';

class Body extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      "sentimentValue": "No Song chosen yet!",
      "lowestSentimentSongsArray":[],
      "highestSentimentSongsArray":[]
    }
  }

  updateSongTables = async () => {
    var lowestSongsArray = await songSentimentService.getLowestSentimentSongs();
    var highestSongsArray = await songSentimentService.getHighestSentimentSongs();
    this.setState({lowestSentimentSongsArray: lowestSongsArray});
    this.setState({highestSentimentSongsArray: highestSongsArray});
  }

  getSentimentValueForSong = async (songObject) => {
    this.setState({"sentimentValue":"Calculating!"});
    var sentimentValue = await songSentimentService.getSentimentValueForSong(songObject);
    this.setState({"sentimentValue":sentimentValue.toString()});
  }

  render(){
    this.updateSongTables();

    var myBackGroundStyle = {
      backgroundColor: "lightblue",
      fontFamily: "Arial"
    };

    return (
      <body style={myBackGroundStyle}> 
        <div className="container" >
          <div className="row">
            <div className="col-6">
              <SongSearch getSentimentValueFunction={this.getSentimentValueForSong}/>
            </div>
            <div className="col-6">
              <SongSentimentResult sentimentValueProp={this.state.sentimentValue} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <LowestSentimentSongs lowestSentimentSongs={this.state.lowestSentimentSongsArray} />
            </div>
            <div className="col">
              <HighestSentimentSongs highestSentimentSongs={this.state.highestSentimentSongsArray}/>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default Body;