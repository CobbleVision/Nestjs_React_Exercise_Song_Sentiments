import React from 'react';
import songSentimentService from '../songSentimentService';

class LowestSentimentSongs extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){

        var lowestSentimentSongsContent = this.props.lowestSentimentSongs.map( lowestSong => (
            <tr>
              <td> {lowestSong.songName}</td>
              <td> {lowestSong.sentimentRating }</td>
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
                        {lowestSentimentSongsContent}
                    </tbody>
                </table>
            </div>  

        );
    }
    
}

export default LowestSentimentSongs;