import React, { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import loader from "../assets/loader.svg";
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * @author
 * @function OnlineUsers
 **/

const OnlineUsers = (props) => {
  const { onUserSelect, users, username, checkUnseenMessages,startConversation, nextPage } = props;
  const [countdown , setCountdown] = useState(40)
  const [ customerService , setCustomerService] = useState(0)

  // if(countdown > 0){
  //   setInterval(() => {
  //     setCountdown(countdown-1)
  //   }, 1000);
  // }


  const changeCsStatus = ()=>{
    setCustomerService(1)
      setTimeout(() => {
        setCustomerService(0)
        nextPage()
      }, 5000);
  }


  
  return (
   <>
    <div>
      <div></div>
      <div className="online-users-header" style={{ backgroundColor: '#ed712f', border:'1px solid #ed712e ' }}>
        <div className="" style={{ margin: "0 10px" }}>Online Users
        </div>
      </div>
      <ul className="users-list">
        {/* if username is customer servie show other users  */}
        {/* else show only customer service if available */}
        {/* print customer service is comming when customer service is not online */}



        {users &&
          Object.keys(users).map((user, index) => (
            <>
              {user !== username && username == 'customer service' ?(
                <li key={user} onClick={() => onUserSelect(user)}>
                  <span style={{ textTransform: "capitalize" }}>{user}</span>
                  {checkUnseenMessages(user) !== 0 ? (
                    <span className="new-message-count">
                      {checkUnseenMessages(user)}
                    </span>
                  ) : null
                  }
                  </li>
              ) : 
              null
              }
            </>
          ))}

          {users &&
            Object.keys(users).map((user, index) => (
              <>
                {user == 'customer service' && username != 'customer service' ? (
                  <li key={user} onClick={() => onUserSelect(user)}>
                    <span style={{ textTransform: "capitalize" }}>{user}</span>
                    {checkUnseenMessages(user) !== 0 ? (
                      <span className="new-message-count">
                        {checkUnseenMessages(user)}
                      </span>
                    ) : null}
                  </li>
                ) : null}
              </>
            ))}
      </ul>
    </div>

    <div className="mt-5 text-center">
     
          {
            customerService === 0 ? (
              <Button id='btn3456' style={{ backgroundColor: '#ed712e', border:'1px solid #ed712e ' }}
              onClick={changeCsStatus}
              > if no customer service is online click here </Button>
            ) : null
          }

          {
            customerService === 1 ? (
             <div className="text-center">
                  
                  <Spinner animation="border" style={{ color:'#ed712e' }}>
                  </Spinner> searching
                 
             </div>
            ) : null
          }


        
    </div>
   </>
  );
};

export default OnlineUsers;
