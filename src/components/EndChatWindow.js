import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap'

const EndChatWindow = (props) => {
    const {seconds} = props
    const rate = 0.6
  return (
    <div className="card card-body shadow">
      <div>
        <div className='row mb-3'>
            <div className='col-md-6'>
            <Card border='success' style={{ height : '100px' }}>
              <Card.Header style={{ color: '#ed712e', border:'1px solid #ed712e ' }}>Time-tracker</Card.Header>
                    <Card.Body>
                        your time spent  was <span  style={{ fontWeight : 'bold' }}> {Math.round(seconds)} seconds </span>
                    </Card.Body>
                </Card>
            </div>
    
            <div className='col-md-6'>
                    <Card border='primary' style={{ height : '100px' }}>
                        <Card.Body className=''>
                            your bill for time is <span  style={{ fontWeight : 'bold' }}> ${Math.round(Math.round(seconds) * rate)}</span>
                        </Card.Body>
                    </Card>
            </div>
        </div>
      </div>

          <Button className='mb-2' style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }}>continue to pay</Button>
          <Button className='mb-2' variant='white'>go to dashboard</Button>

       
    </div>
  )
}

export default EndChatWindow