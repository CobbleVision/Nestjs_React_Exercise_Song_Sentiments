import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import songSentimentService from './songSentimentService.js';

class MainTemplate extends React.Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return (
      <>
      < Header/>
      < Body/>
      < Footer/>
      </>
    )  
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainTemplate />)
