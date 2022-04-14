/**
 * @author
 * @function CreateUser
 **/

import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const CreateUser = (props) => {
  const { onCreateUser, value, onChange } = props;
  const handleLogout = () => {
    sessionStorage.clear();
    console.log(localStorage)
    window.location.reload()
  };




 

  return (
    <div className="text-center">
      <Card>
        <Card.Body>
            <div>
              <form onSubmit={onCreateUser} style={{ display: "inline-block" }}>
              <h5 className="username-label fs-8">Enter username for conversation</h5>
              <input className="input form-control" value={value} onChange={onChange} />
              </form>
            </div>

            <div className='text-center'>
            <Button onClick={handleLogout} style={{backgroundColor: '#ed712e', border:'1px solid #ed712e '}} className='mt-2'>Logout</Button>
            </div>
           

        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateUser;
