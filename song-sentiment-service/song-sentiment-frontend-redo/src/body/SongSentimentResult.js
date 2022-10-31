import React from 'react';

import songSentimentService from '../songSentimentService';

class SongSentimentResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return (
            <div>
            <br></br><br></br><br></br><br></br><br></br>
            <h4><b> has a sentiment Value of: {this.props.sentimentValueProp}</b><b id="sentimentValueField"></b></h4>
          </div>  
        );
    }
    
}

export default SongSentimentResult;