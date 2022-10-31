import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

var searchForSongs = function(){
  
  var songname = document.getElementById("songSearchInput").value
  
  var jsonObject = { "songName": songname};

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    //Array of SongElements with properties
    //title, thumbnail, id, artist
    const response = JSON.parse(xhr.responseText);
    
    //Cleaning the Dropdown before adding new results!
    var dropDownMenu = document.getElementById("dropdownMenu");
    dropDownMenu.innerHTML = "";

    if(response.length != undefined){
      
      //Modifying the display to show results
      var dropDownButtonText = document.getElementById("DropdownButtonText");
      dropDownButtonText.innerHTML = "Choose one of these songs!"

      var songSearchButton = document.getElementById("songSearchButton")
      songSearchButton.classList.remove("btn-secondary");
      songSearchButton.classList.add("btn-primary");
      songSearchButton.removeAttribute('disabled');

      var dropDownMenuRoot = ReactDOM.createRoot(dropDownMenu);

      dropDownMenuRoot.render(
        response.map(response => (
          <a className="dropdown-item p-1" data-custom={JSON.stringify(response)} onClick={(e) => getSentimentValueForSong(e)}>
            <div className="container">
              <div className="row">
                <div className="col-2">
                  <img className="img-fluid" src={response.thumbnail}></img>
                </div>
                <div className ="col-10">
                  <b> {response.title} </b>
                  <br></br>
                  <div> written by {response.artist}</div>
                </div>
              </div>
            </div>
          </a>
        ))
      )

        // songLink.onclick = function(e){
        //   getSentimentValueForSong(e);
        // }
    }else{

      //Modifying the display to show no results
      var dropDownButtonText = document.getElementById("DropdownButtonText");
      dropDownButtonText.innerHTML = "You need to enter a song title or author!"
      
      var songSearchButton = document.getElementById("songSearchButton")
      songSearchButton.classList.remove("btn-primary");
      songSearchButton.classList.add("btn-secondary");
      songSearchButton.setAttribute('disabled', 'disabled');
    }  
  };

  xhr.open("POST", 'http://localhost:5001/song', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(jsonObject));
}

var getSentimentValueForSong = function(e){
  var songJSON = JSON.parse(e.currentTarget.getAttribute("data-custom"));
  
  //Updating the text field to show chosen song name and artist
  document.getElementById("songSearchInput").value = songJSON.title + " " + songJSON.artist
  document.getElementById("sentimentValueField").innerHTML = "Calculating"
  searchForSongs()

  const xhr = new XMLHttpRequest();

  xhr.onload = () => {

    const sentimentRating = xhr.responseText;
    //Showing the sentiment value of this song
    document.getElementById("sentimentValueField").innerHTML = sentimentRating
    updateTables()
  }

  xhr.open("POST", 'http://localhost:5001/song/sentiment', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  var postJSON = {
    "songName": songJSON.title,
    "songAuthor": songJSON.artist
  }
  xhr.send(JSON.stringify(postJSON));
  //Updating Song Fields to show correct data
}

var updateTables = function(){
  getHighestSentimentSongs()
  getLowestSentimentSongs()
}

var getHighestSentimentSongs = function(){
  document.getElementById("highestSentimentTable").innerHTML = "";
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    var resultJSON = JSON.parse(xhr.responseText);

    var tableBody = document.getElementById("highestSentimentTable");
    var tableBodyRootDocument = ReactDOM.createRoot(tableBody);

    tableBodyRootDocument.render(
      resultJSON.map(resultJSON => (
        <tr>
          <td> {resultJSON.songName}</td>
          <td> {resultJSON.sentimentRating }</td>
        </tr>
      ))
    )
  }

  xhr.open("GET", 'http://localhost:5001/song/highest', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

}

var getLowestSentimentSongs = function(){
  document.getElementById("lowestSentimentTable").innerHTML = "";
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    var resultJSON = JSON.parse(xhr.responseText);

    var tableBody = document.getElementById("lowestSentimentTable");
    var tableBodyRootDocument = ReactDOM.createRoot(tableBody);
    
    tableBodyRootDocument.render(
      resultJSON.map(resultJSON => (
        <tr>
          <td> {resultJSON.songName}</td>
          <td> {resultJSON.sentimentRating }</td>
        </tr>
      ))
    )
  }
  
  xhr.open("GET", 'http://localhost:5001/song/lowest', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

}

function SongSearch() {
  return (
    <div>
      <div className="dropdown">
        <br></br> <br></br> <br></br> <br></br> <br></br>
        <input type="text" id="songSearchInput" className="form-control w-100" onChange={searchForSongs}></input>
        <br></br>
        <button className="btn btn-secondary dropdown-toggle w-100" id="songSearchButton" type="button" data-toggle="dropdown" aria-expanded="false">
          <b id="DropdownButtonText">No song suggestions available yet.</b>
        </button>
        <div className="dropdown-menu w-100" id="dropdownMenu">
         </div>
      </div>
    </div>  
  )
}

function SongSentimentResult() {
  return (
    <div>
      <br></br><br></br><br></br><br></br><br></br>
      <h4><b> has a sentiment Value of: </b><b id="sentimentValueField"></b></h4>
    </div>  
  )
}

function HighestSentimentSongs() {
  return (
    <div>
      <br></br><br></br>
      <h4> <b> Highest Rating Songs: </b></h4> 
      <br></br>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Name of Song</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody id="highestSentimentTable">

        </tbody>
      </table>
    </div>  
  )
}

function LowestSentimentSongs() {
  return (
    <div>
      <br></br><br></br>
      <h4> <b> Lowest Rating Songs: </b></h4> 
      <br></br>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Name of Song</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody id="lowestSentimentTable">

        </tbody>
      </table>
    </div>  
  )
}


// THIS IS AN EXAMPLE FOR A COMPONENT CLASS ELEMENT TO UPDATE LIVE DATA ON REQUEST UPDATE
// PROBLEM IS: HOW DO I CALL THIS FROM OUTSIDE?
// THERE IS NO ELEGANT SOLUTION. Using Render multiple times appears more attractive.

class TestElement extends React.Component {
  constructor(props){
    super();
    this.state={
      tableColumns:[{songName:"BLA!", sentimentRating: 123}],
      testProp: props.testProp
    };
    console.log(this.props)
    this.setTableColumns=this.setTableColumns.bind(this);
    this.setTableColumns();
}

setTableColumns(){
  const xhr = new XMLHttpRequest();

  xhr.onload = () => {
    var resultJSON = JSON.parse(xhr.responseText);
    this.setState({tableColumns : resultJSON})
  }
  
  xhr.open("GET", 'http://localhost:5001/song/lowest', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();

}

  render(){
    return this.state.tableColumns.map(tableColumn => (
        <tr>
          <td>  {this.state.testProp} </td>
          <td> {tableColumn.songName}</td>
          <td> {tableColumn.sentimentRating }</td>
        </tr>
        ));
      } 
}


function Body() {
  const myBackGroundStyle = {
    backgroundColor: "lightblue",
    fontFamily: "Arial"
  };

  useEffect(() => {
    updateTables()
  });

  return (
    <body style={myBackGroundStyle}> 
      <div className="container" >
        <div className="row">
          <div className="col">
            <SongSearch/>
          </div>
          <div className="col">
            <SongSentimentResult/>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <LowestSentimentSongs/>
          </div>
          <div className="col">
            <HighestSentimentSongs/>
          </div>
        </div>
      </div>
      <br></br>
    </body>
  );
}

function changeVar() {
 test = "NEWVAR";
 console.log("BLA!");
 console.log(test)
}

function oldVAR() {
  test = "OLDVAR";
 }

var test = "TESTVARIABLE"
export default Body;