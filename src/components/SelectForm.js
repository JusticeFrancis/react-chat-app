import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card , InputGroup, Spinner} from 'react-bootstrap';
import { useState } from 'react';



const ImportantInformation = ()=>{
    return(
        <div className='fst-italic fs-8'>
             After booking for an appointment , check for the apointment link in your email a notification will also reach you on the appointment day via email
        </div>
    )
}



const SelectForm = (props) => {
    const {startConversation} = props;
    const [importantInfo, setImportantInfo] = useState(0)
    const [btnDisable, setBtnDisable] = useState(1)
    const [email , setEmail] = useState('')
    const [date , setDate] = useState('')
    const[appointment , setAppointment] = useState(0)
    const[loader, setLoader] =  useState(false)
    const[id , setId] = useState('')
    const showImportantInfo =()=>{
        const policyCheckbox = document.querySelector("#policy-checkbox");
        if (policyCheckbox.checked == true) {
            setImportantInfo(1)
            setBtnDisable(0)
        } else {
            setImportantInfo(0)
            setBtnDisable(1)
        }
    }

    async function submitAppointment(){
        setLoader(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: date , email: email })
        };
        console.log(requestOptions)
        const response = await fetch('https://eli-fy.herokuapp.com/appointment/create', requestOptions)
        const res = await response.json()
        console.log(res.message)
        if (res.message === 'successfull')
        {
            setId(res.appointment._id)
            console.log(res.appointment)
            setAppointment(1)
            setTimeout(() => {
                setLoader(false)
            }, 3000);
        }
            //.then(data => this.setState({ postId: data.id }));
      console.log('done')
    }

   
  return (
    <div>
        {appointment === 1
        ?(
            <div className="card card-body shadow">
                <div>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                        {loader === true
                        ?(
                            <div className='text-center'>
                                <Spinner animation='border' style={{color: '#ed712e'}}></Spinner>
                            </div>
                        )
                        :(
                        <div>
                             <Card border='' style={{ height : '150px' }}>
                                <Card.Body>
                                    <span> Appointment id : [{id}]</span>
                                </Card.Body>
                            </Card>
                            <Card border='' className='mt-2' style={{ height : '150px' }}>
                                <Card.Body>
                                    <span> voila , your appointment has been set , for {date} , check your mail ({email}) inbox and spam for <span style={{ fontWeight: 'bold' }}> conversation link</span> </span>
                                </Card.Body>
                        </Card>

                        <Card border='' className='mt-2' style={{ height : '100px' }}>
                                <Card.Body>
                                    <span> Also you will recieve another email on the day ({date}) of your appointment  </span>
                                </Card.Body>
                        </Card>
                        </div>
                        )

                        }
                        </div>
                
                    </div>
                </div>

          <Button className='mb-2'style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }} href='https://accounts.google.com/servicelogin' target='_blank'>continue to my mail</Button>
          <Button className='mb-2' variant='white'>go to dashboard</Button>

       
    </div>
        )
        :null

        }




        {/* user hasnt set appointment */}
       {appointment === 0 
       ?(
            <Card>
                <Card.Body>
                <Card.Title className='text-center'>Schedule an appoint</Card.Title>
                <p  className="text-center" style={{ fontSize:'15px' }}>customer service specialist is not available now please make an apointment between</p>
                <p className='text-center' style={{ fontWeight: 'bolder' }}>9am - 5pm PST</p>
                <div className='form-group mb-2'>
                    <label>Date</label>
                    <input
                    type="datetime-local"
                    className='form-control'
                    onChange={(e)=>{
                        setDate(e.target.value)
                    }}
                    id = 'date'
                    />
                    
                </div>

                <div className='form-group mb-2'>
                    <label>Email</label>
                    <input
                    type="email"
                    className='form-control'
                    id='email'
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}
                    
                    />
                    
                    
                </div>

                <div className='form-group mb-2'>
                    <label>Reminder</label>
                    <input
                    type="text"
                    className='form-control'
                    value='email'
                    disabled
                    />
                    
                    
                </div>

                <div className='form-group mb-2'>
                    <input
                    type="checkbox"
                    className='mr-2'
                    onClick={showImportantInfo}
                    id='policy-checkbox'
                    />
                    <label>&nbsp; I agree with chat terms and policy(*)</label>
                    
                </div>
                

                {  
                importantInfo === 1 ? (<ImportantInformation/>) : null
                }

             <div className='text-center'>
             {
                    btnDisable === 1 
                    ?( <Button variant='primary' style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }} disabled className='m-1'>Set appointment</Button> )
                    :  (<Button variant='primary' style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }} className='m-1' onClick={submitAppointment}>Set appointment</Button>)
                } 

             </div>
                </Card.Body>
            </Card>
       )
       : null
       }
    </div>
  )
}

export default SelectForm