import React from 'react';
import songSentimentService from '../songSentimentService';

class HighestSentimentSongs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        var highestSentimentSongsContent = this.props.highestSentimentSongs.map( highestSong => (
            <tr>
              <td> {highestSong.songName}</td>
              <td> {highestSong.sentimentRating }</td>
            </tr>
          ))

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
                        {highestSentimentSongsContent}
                    </tbody>
                </table>
            </div>  

        );
    }
    
}

export default HighestSentimentSongs;