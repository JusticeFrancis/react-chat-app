import React from 'react'
import { Button, Card } from 'react-bootstrap'

const NoAppointment = (props) => {
    const{msg} = props
  return (
    <div className="username-container">
    <div className='text-center'>
        <Card>
            <Card.Body>
                <div className='text-center text-danger'>{msg}</div>
            </Card.Body>
        </Card>
        
        <Button
        style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }}
        className='mt-2'
        >go back to dashboard</Button>
    </div>
    </div>
  )
}

export default NoAppointment