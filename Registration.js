import React from 'react'
import styled from 'styled-components'
import Context from './Context'
import firebase from 'firebase';


let Container = styled.main`
background-color: #ffff;
min-height: 500px;
padding: 10px 10%;

`

let AddBox = styled.div`
margin: 50px auto;
    width: 650px;
    height: 500px;
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
font-family: 'Play', sans-serif;

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
font-family: 'Play', sans-serif;

`
let SignupDiv=styled.div`
display: flex;
justify-content: center;
justify-items: center;
`

class Registration extends React.Component {
    constructor() {
        super()
        this.state={
            Email:'' ,
            Name:'',
            PhoneNumber:'',
            Password:'',

 

        }
        


        
    }
    
        onChangeEmail(value){
            this.setState({
                Email:value
            })
            
        }
        onChangeName(value){
            this.setState({
                Name:value
            })
            
        }
        onChangePhoneNumber(value){
            this.setState({
                PhoneNumber:value
            })
            
        }
        onChangePassword(value){
            this.setState({
                Password:value
            })
            
        }
        OnRegistration(){
// console.log(this.state.Name+this.state.Password+this.state.Email+this.state.PhoneNumber)

let email=this.state.Email;
let password=this.state.Password;
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ...
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href='/home' 
     
    } else {
      
      // window.location.href='/home' 
    }
  });

//   window.location.href='/home'         
        }

    
    render() {
        return (
            <div>
                 <div>

                        <AddBox>
                            <LDiv >
                            <h1>Registration</h1>
                            <Limg  src={require('./assets/planing.svg')}/>
                            </LDiv>
                           
                           
                            <LoginLable >Email</LoginLable>
                            <div>
                               
                            <InputText type="text" name="Email"   value={this.state.Email} onChange={(event)=>{
                               this.onChangeEmail(event.target.value)
                            }} placeholder="  Enter your email"></InputText>
                            </div>
                            <LoginLable >Name</LoginLable>
                            <div>
                               
                            <InputText type="text" name="Email"   value={this.state.Name} onChange={(event)=>{
                               this.onChangeName(event.target.value)
                            }} placeholder="  Enter your Name"></InputText>
                            </div>
                            <LoginLable >Phone Number</LoginLable>
                            <div>
                               
                            <InputText type="text" name="PhoneNumber"   value={this.state.PhoneNumber} onChange={(event)=>{
                               this.onChangePhoneNumber(event.target.value)
                            }} placeholder="  Enter your Phone Number"></InputText>
                            </div>


                            <LoginLable >Password</LoginLable>
                            <div>
                                
                               
                            <InputText type="Password" name="Password" id="Password" value={this.state.Password} onChange={(event)=>{
                               this.onChangePassword(event.target.value)
                            }} placeholder="  Enter your password"></InputText>
                            </div>

                            <Btn onClick={()=>{this.OnRegistration()}}>Register</Btn>
                            <SignupDiv>
                       
                            </SignupDiv>
                        </AddBox>

                        <Container>

                            
                        </Container>
                        </div>
               
            </div>
        )
    }
}

export default Registration;