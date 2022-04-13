import { Button, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import "../App.css";
import logo from "../assets/chat.png";


const StartAppointment = () => {
  const [id , setId] = useState('')
  const [msg , setMsg] = useState('')
  const [loader , setLoader] = useState(false)
  const[passed , setPassed] = useState(false)
 

  async function startConversation(){
    setLoader(true)
    if(id.length <= 11){
      setMsg('invalid appointment ID')
      setLoader(false)
    }else{
 
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: id})
      };
      console.log(requestOptions)
      const response = await fetch('http://liuyangtong.herokuapp.com/appointment/verify', requestOptions)
      const res = await response.json()
      console.log(res.message)
      if (res.type === 'success')
      {
        setPassed(true)
        setMsg(res.msg)
        setTimeout(() => {
          return window.location.href = "/?state="+res.id;
        }, 10000);
        console.log('well')
      }else{
        setPassed(false)
        setMsg(res.msg)
        setLoader(false)
      }
    }
    }
  return (
    <div>
       
        <div className="App">
        <header className="app-header">
          <img src={logo} alt="" />
          <div className="app-name b-500 primaryColor">Liuyangtong</div>
        </header>

        <div className="chat-system">
          <div className="chat-box">

         <Card>
              {passed === true 
              ?(
                <Card.Body>
                  <div className='text-center'>
                    <Spinner animation= 'border' variant='success'></Spinner>
                    <p>loading conversation...</p>
                  </div>
                </Card.Body>
              )
              :(
                <Card.Body>
                <Card.Title className='text-center'>Enter appointment ID</Card.Title>
                <div className='form-group mb-2'>
                    <label>ID</label>
                    <input
                    type="text"
                    className='form-control'
                    onChange={(e)=>{
                        setId(e.target.value)
                    }}
                    id = 'appointment_id'
                    />
                    
                </div>

                <div className='text-danger'>
                  {msg}
                </div>

                <div className='text-center'>
                {loader === false 
                ?( <Button variant='success' onClick={startConversation}> start conversation</Button>)
                : (
                  <Spinner animation='border' variant='success'></Spinner>
                )
                }
                </div>
                </Card.Body>
              )
              }
          </Card>


          </div>
        </div>
      </div>
       
    </div>
  )
}
export default StartAppointment

