import { render } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import songSentimentService from '../songSentimentService';

class SongSearch extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        searchSongButtonText: "No song suggestions available yet.",
        songSuggestions: [],
        sendSentimentObjectToParent: props.getSentimentValueFunction
    }
  }

   searchForSongs = async () => {
    var songname = document.getElementById("songSearchInput").value
    
    if(songname.length > 0){
    //If Text in SearchSong Input get Song Suggestions from songSentimentService
        var songSuggestionsList = await songSentimentService.searchForSongs(songname);
        this.setState({searchSongButtonText: "Choose from Dropdown list!"})
        this.setState({songSuggestions: songSuggestionsList})
        document.getElementById("songSearchButton").classList.remove("btn-secondary");
        document.getElementById("songSearchButton").classList.add("btn-primary");
    }else{
        //Emptying State Variables
        this.setState({searchSongButtonText: "No song suggestions available yet."});
        this.setState({songSuggestions: []});
        document.getElementById("songSearchButton").classList.remove("btn-primary");
        document.getElementById("songSearchButton").classList.add("btn-secondary");
    }
  }

  getSentimentValueForSong = (e) => {
    //Processing is done in Parent Called "Body!" This is because this Element has no access to SongSentimentResult. Neighbor Communication is not possible.
    var songJSON = JSON.parse(e.currentTarget.getAttribute("data-custom"));
    document.getElementById("songSearchInput").value = songJSON.title + " " + songJSON.artist
    this.state.sendSentimentObjectToParent(songJSON)
  }

  render(){

    var dropDownListComponents = this.state.songSuggestions.map(songSuggestion => (
        <a className="dropdown-item p-1" data-custom={JSON.stringify(songSuggestion)} onClick={(e) => this.getSentimentValueForSong(e)}>
            <div className="container">
            <div className="row">
                <div className="col-2">
                <img className="img-fluid" src={songSuggestion.thumbnail}></img>
                </div>
                <div className ="col-10">
                <b> {songSuggestion.title} </b>
                <br></br>
                <div> written by {songSuggestion.artist}</div>
                </div>
            </div>
            </div>
        </a>
        ))

    return (
        <div>
        <div className="dropdown">
          <br></br> <br></br> <br></br> <br></br> <br></br>
          <input type="text" id="songSearchInput" className="form-control w-100" onChange={this.searchForSongs}></input>
          <br></br>
          <button className="btn btn-secondary dropdown-toggle w-100" id="songSearchButton" type="button" data-toggle="dropdown" aria-expanded="false">
            <b id="DropdownButtonText">{this.state.searchSongButtonText}</b>
          </button>
          <div className="dropdown-menu w-100" id="dropdownMenu">
            {dropDownListComponents}
           </div>
        </div>
      </div>  
    );
  }
}

export default SongSearch;