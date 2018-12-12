
import React, { Component } from 'react'
import styled from 'styled-components'
import firebase from 'firebase';

let Navigation = styled.header`
  display: flex;
  padding: 0px 10%;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 25px rgba(0,0,0,0.16);
  height: 100px;
`
let LogoutBtn=styled.button`
background-color: #c00b0b; 
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`
let NewsContainer = styled.main`
  background-color: #ebf2f5;
  padding: 20px 10%;

`

let NewsItem = styled.div`
  background-color: #fff;
  border: 2px solid #E5E9F2;
  min-height: 150px;
  margin: 20px 0px;
  border-radius: 4px;
  display: flex;
  padding: 10px;
  
`

let NewsText = styled.div`
  padding-left: 14px;
  position: relative;
  flex-basis:800px;
  flex-grow: 2;
`

let DateTime = styled.time`
  position: absolute;
  bottom: 0px;
  color: #399DF2;
  font-family: sans-serif;
`


let Vdiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;
flex-grow: 1;
margin: auto
`
let VoteImg = styled.img`
height: 20px;
width: 20px;
margin: auto

`

class News extends Component {

  constructor() {
    super()
    this.state = {
      news: [],
      searchValue: '',
      isLoading: true,
      news2: []
    }


    this.getArticles()
  }

  getArticles(){
    firebase.firestore().collection('articles').onSnapshot((snapshot) => {
        let articles = []
  
        snapshot.forEach((doc) => {
            articles.push(doc.data())

          this.setState({
            news2: articles
          })
          
        })
        
      })
      
  }
  //this function used to render data from localStorage
  componentDidMount() {
    if (localStorage.length == 0) {
        this.getArticles();
      this.getNews()
      

    } else {
      this.setState({
        news2: JSON.parse(localStorage.getItem('data')),
      })
      alert("data from localStorage")
      console.log("data from localStorage")
    }
  }
  //this function used to load data from localStorage
  componentWillMount() {
    localStorage.getItem('date') && this.setState({
      new2s: JSON.parse(localStorage.getItem('data')),
    })
  }
  //this function used to update  localStorage data 
  componentWillUpdate(nextProps, nextState, i) {

    localStorage.setItem('data', JSON.stringify(nextState.news2))
  }

  //this function used to increase vote
  upvote(i) {
    let conter= this.state.news2[i].vote
    let articlesID=this.state.news2[i].articlesID
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
          uid = user.uid;  
        }
        var votedUsers = [{}];
        firebase.firestore().collection('votedUsers').where('articlesID','==',articlesID).where('userID','==',uid).onSnapshot((snapshot) => {
         snapshot.forEach((doc) => {
         votedUsers.push(doc.data());
         })
       
       }) 
    setTimeout(function(){ 
     if (votedUsers.length==1||votedUsers[1].vote=='down') {
        if (votedUsers.length!=1&&votedUsers[1].vote=='down') {
          firebase.firestore().collection("votedUsers").where('voteIdD','==',votedUsers[1].voteIdD).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                firebase.firestore().collection('votedUsers').doc(doc.id).update({
                  vote: 'up'
                   });
            });
        });
        } else {
          var vote =firebase.firestore().collection("votedUsers").doc();
          var id = vote.id;
          
          vote.set({
            voteIdD:id,
            articlesID: articlesID,
            userID: uid,
            vote:'up'
              })  
        }

  firebase.firestore().collection("articles").where('articlesID','==',articlesID).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
        
          firebase.firestore().collection('articles').doc(doc.id).update({
              vote: conter+1,
            
             });
      });
  });
     } else {

      console.log(votedUsers)
      alert('you already voted on this article')
     }
     var elem = document.getElementById('upvote'+ i);
     elem.parentNode.removeChild(elem);
           }, 500);
  }



  //this function used to decrease vote
  downvote(i) {

    let conter= this.state.news2[i].vote
    let articlesID=this.state.news2[i].articlesID
        var user = firebase.auth().currentUser;
        var uid;
        if (user != null) {
          uid = user.uid;  
        }
        var votedUsers = [{}];
        firebase.firestore().collection('votedUsers').where('articlesID','==',articlesID).where('userID','==',uid).onSnapshot((snapshot) => {
         snapshot.forEach((doc) => {
       
           votedUsers.push(doc.data());
    
         })
       
       }) 
    setTimeout(function(){
      
     if (votedUsers.length==1||votedUsers[1].vote=='up') {
        
        if (votedUsers.length!=1&&votedUsers[1].vote=='up') {
          firebase.firestore().collection("votedUsers").where('voteIdD','==',votedUsers[1].voteIdD).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
              
                firebase.firestore().collection('votedUsers').doc(doc.id).update({
                  vote: 'down'
                  
                   });
            });
        });
        } else {
          var vote =firebase.firestore().collection("votedUsers").doc();
    
          var id = vote.id;
          
          vote.set({
            voteIdD:id,
            articlesID: articlesID,
            userID: uid,
            vote:'down'
              })  
        }

  firebase.firestore().collection("articles").where('articlesID','==',articlesID).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
        
          firebase.firestore().collection('articles').doc(doc.id).update({
              vote: conter-1,
            
             });
      });
  });

  } else {
      console.log(votedUsers)
      alert('you already voted on this article')
     }
     
     var elem = document.getElementById('downvote'+ i);
     elem.parentNode.removeChild(elem);
           }, 500);
 
}
  //this function used to render html
  render() {

    return (
      <React.Fragment>
        <Navigation>
          <img width="150px;" src={require('./assets/logo.svg')} />
          <LogoutBtn onClick={()=>{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        window.location.href='/' 
      }).catch(function(error) {
        // An error happened.
      });
}}>Logout</LogoutBtn>
        </Navigation>
        <NewsContainer>
          {

            this.state.news2.map((item, i) => {
              return (

                <NewsItem key={i}>
                  <img width="124px;" height="124px" src={item.urlToImage} />
                  <NewsText>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <DateTime>{item.publishedAt}</DateTime>
                  </NewsText>
                  <Vdiv>
                    <VoteImg onClick={this.upvote.bind(this, i)} id={"upvote" + i} src={require('./assets/upvote.svg')} />
                    <p id={"description" + i}>{item.vote}</p>
                    <VoteImg onClick={this.downvote.bind(this, i)} id={"downvote" + i} src={require('./assets/downvote.svg')} />
                  </Vdiv>
                </NewsItem>
              )
            })
          }

        </NewsContainer>
      </React.Fragment>
    )
  }
}
export default News;