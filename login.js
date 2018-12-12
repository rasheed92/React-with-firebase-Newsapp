import React from 'react'
import styled from 'styled-components'
import firebase from 'firebase';
import withFirebaseAuth from "react-auth-firebase";
import { BrowserRouter, Route, Link ,Redirect,Switch} from 'react-router-dom'

let Container = styled.main`
background-color: #ffff;
min-height: 500px;
padding: 10px 10%;

`

let AddBox = styled.div`
margin: 50px auto;
    width: 650px;
    height: 403px;
    border-radius: 5px;
    box-sizing: border-box;
    background-image: url(https://i.imgur.com/pEQSsEu.png);
    border-image-slice: 1;
    border-width: 3px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 7px #00000099;
`

let InputText =styled.input`
width: 70%;
height: 30px;
margin-left: 80px;
margin-top: 15px;
margin-bottom: 10px;
border: none;
border-bottom: 2px solid #d4d4d4;
outline: none;
`
let LDiv=styled.div`

display: flex;
justify-content: center;
justify-items: center;
`
let Limg=styled.img`

width:30px;
height:30px
margin-top: 23px;
padding-left: 10px;
`
let Btn=styled.button`

background-image: linear-gradient(rgba(143, 211, 244, 1), rgba(143, 211, 244, 0.5));
color: white;

border: none;
cursor: pointer;
width: 104px;
opacity: 0.9;
height: 40px;
margin-left: 244px;
margin-top: 20px;
`
let LoginLable=styled.label`
margin-left: 80px;

`
let SignupDiv=styled.div`
display: flex;
justify-content: center;
justify-items: center;
`
let ImgSignup=styled.img`

width: 21px;
height: 20px;
margin-top: 21px;
padding-left: 10px;
`
let PSignup=styled.a`
margin-left: -29px;
margin-top: 20px;
`
class LoginForm extends React.Component {
    constructor() {
        super()
        this.state ={
            Email:'',
            Password:'',
            redirectToReferrer: true
        }
    }
    onChangeEmail(value){
        this.setState({
          Email: value
        })
      }
      onChangePassword(value){
        this.setState({
          Password: value
        })
      }
      Login(){
        

  
    
        
             
           
           
        
      
        let email=this.state.Email;
        let password=this.state.Password;
        console.log (password)
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        
       if (errorMessage==null) {
       
       }
          // ...
        });

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            window.location.href='/home' 
           
          } else {
            
            // window.location.href='/home' 
          }
        });




        // var user = firebase.auth().currentUser;
        //   var name, email2, photoUrl, uid, emailVerified;

        //   if (user != null) {
        //     name = user.displayName;
        //     email2 = user.email;
        //     photoUrl = user.photoURL;
        //     emailVerified = user.emailVerified;
        //     uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
        //                     // this value to authenticate with your backend server, if
        //                     // you have one. Use User.getToken() instead.
        //                     alert(uid)
        //                   }

        
      }



    render() {
        return (
            <div>
              
                     <div>

                        <AddBox>
                            <LDiv >
                            <h1>Login</h1>
                            <Limg  src={require('./assets/login.svg')}/>
                            </LDiv>
                           
                           
                            <LoginLable >Email</LoginLable>
                            <div>
                               
                            <InputText type="text" name="Email" id="Email"  value={this.state.Email} onChange={(event)=>{
                               this.onChangeEmail(event.target.value)
                            }} placeholder="  Enter your email"></InputText>
                            </div>
                            <LoginLable >Password</LoginLable>
                            <div>
                               
                            <InputText type="Password" name="Password" id="Password" value={this.state.Password} onChange={(event)=>{
                               this.onChangePassword(event.target.value)
                            }} placeholder="  Enter your password"></InputText>
                            </div>

                            <Btn onClick={()=>{this.Login()}}>Login</Btn>
                            <SignupDiv>
                            <PSignup href="/registration">Or SignUp Here</PSignup > 
                            <ImgSignup  src={require('./assets/right-arrow.svg')}/>
                       
                            </SignupDiv>
                        </AddBox>

                        <Container>

                            
                        </Container>
                        </div>
                
            </div>
        )
    }
}

export default LoginForm;