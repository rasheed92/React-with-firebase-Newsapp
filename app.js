
// import necesary libs.
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase';
import { BrowserRouter, Route} from 'react-router-dom'

import LoginForm from './Login'
import News from './News'
import Registration from './Registration'



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCLIQhl0Znov5O5gQvYxaq9zGwYE1Gg3XI",
    authDomain: "newsapp-c5de4.firebaseapp.com",
    databaseURL: "https://newsapp-c5de4.firebaseio.com",
    projectId: "newsapp-c5de4",
    storageBucket: "newsapp-c5de4.appspot.com",
    messagingSenderId: "1080611952537"
  };
  firebase.initializeApp(config);


function App() {
  return <div>
      <BrowserRouter>
      <div>
        
      <Route exact path="/" component ={LoginForm}/>
      <Route exact path="/home" component ={News}/>
      <Route exact path="/registration" component ={Registration}/>
      

</div>
        </BrowserRouter> 
  </div>
}

ReactDOM.render(<App />, document.getElementById('root'))

