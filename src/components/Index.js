import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Spinner } from 'react-bootstrap'
import { useState } from 'react';
import useSound from 'use-sound';
import boopSfx from '../assets/sounds/boop.mp3';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Index = (props) => {
    const {onClick, users,cs,startConversation} = props;
    const [login , setLogin] = useState(0)
    const[email, setEmail] = useState('')
    const[username, setUsername] = useState('')
    const[password, setPassword] = useState('')
    const[user_type, setUsertype] = useState(1)
    const [loader, setLoader] = useState(false)
    const [info, setInfo] = useState('')

    const [play] = useSound(boopSfx);


    const signin = async()=>{
      setLoader(true)
      
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,password })
      };
      console.log(requestOptions)
      const response = await fetch('https://liuyangtong.herokuapp.com/signin', requestOptions)
      const res = await response.json()
      console.log(res)
      // store the user in localStorage
      if(res.type === true){
        try {
          sessionStorage.clear()
          sessionStorage.setItem('user', JSON.stringify(res.doc))
          console.log(sessionStorage)
          window.location.reload()
        } catch (error) {
          console.log(error)
        }

       startConversation(res.doc.username)
      }else{
        console.log('nothing')
      }

      setLoader(false)
    }

    //register or signup function
    const signup = async()=>{
      setLoader(true)
      if(username === 'customer service'){
        setInfo('change your username')
        setLoader(false)
        return
     }
     if(username < 4){
       setLoader(false)
       setInfo('username cannot be less than 4 characters')
     }

     if(email <= 4){
       setLoader(false)
       setInfo('please input correct email')
       return
     }
     if(password < 6){
      setLoader(false)
      setInfo('your password cannot be less than 6 characters')
      return
    }


      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email,username,password,user_type })
      };
      console.log(requestOptions)
      const response = await fetch('https://liuyangtong.herokuapp.com/signup', requestOptions)
      const res = await response.json()
      console.log(res)
      try {
        sessionStorage.clear()
        sessionStorage.setItem('user', JSON.stringify(res.newUser))
        console.log(localStorage)
        window.location.reload()
      } catch (error) {
        console.log(error)
      }

      setLoader(false)

    }
    


    const changeView = ()=>{
      if(login === 0){
        setLogin(1);
      }
      else{
        setLogin(0);
      }
      console.log(login)
    }
  return (
    <div className="">
     {login === 0 
     ?(
          <Card>
                <Card.Body>
                <Card.Title className='text-center'>Register</Card.Title>
                <p className='text-danger text-center'>{info}</p>
                <div className='form-group mb-2'>
                    <label>email</label>
                    <input
                    type="email"
                    className='form-control'
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div className='form-group mb-2'>
                    <label>username</label>
                    <input
                    type="text"
                    className='form-control'
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                </div>


                {/* <div className='form-group mb-2'>
                    <label>usertype</label>
                    <input
                    type="text"
                    className='form-control'
                    onChange={(e)=>setUsertype(e.target.value)}
                    />
                </div> */}

                <div className='form-group mb-2'>
                    <label>password</label>
                    <input
                    type="password"
                    className='form-control'
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    
                    
                </div>
                <div>
                  or already have an account ?  <a onClick={changeView} style={{ color:"#ed712e" }}>signin</a>
                </div>

              <div className='text-center'>
                 {loader === false 
                 ?( <Button onClick={signup} style={{backgroundColor: '#ed712e', border:'1px solid #ed712e '}}  className='m-1'>Register</Button>)
                :(
                     <Spinner  style={{color: '#ed712e'}} animation='border'></Spinner>
                 )
                 }
                

              </div>
                </Card.Body>
          </Card>
              )
              :(
                <Card>
                      <Card.Body>
                      <Card.Title className='text-center'>Register</Card.Title>
                      <div className='form-group mb-2'>
                          <label>email</label>
                          <input
                          type="email"
                          className='form-control'
                          onChange={(e)=>setEmail(e.target.value)}
                          />
                      </div>
                      <div className='form-group mb-2'>
                          <label>password</label>
                          <input
                          type="password"
                          className='form-control'
                          onChange={(e)=>setPassword(e.target.value)}
                          />
                      </div>
                      <div>
                        or dont have an account  <a onClick={changeView}  style={{ color:"#ed712e" }}>signup</a>
                      </div>

                    <div className='text-center'>
                        {loader === false 
                        ?( <Button onClick={signin} style={{backgroundColor: '#ed712e', border:'1px solid #ed712e '}}  className='m-1'>start conversation</Button>)
                        :(
                            <Spinner style={{color: '#ed712e'}} animation='border'></Spinner>
                        )
                        }
                

                    </div>
                      </Card.Body>
               </Card>
     )
     }
    </div>
  )
}

export default Index

  