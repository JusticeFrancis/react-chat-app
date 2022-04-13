import sendIcon from "../assets/send.png";
import attachment from "../assets/paper-clip.png";
import cancel from "../assets/cancel.png";
import image from "../assets/image.png";
import { Button, Card, Modal, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";

/**
 * @author
 * @function MessagesControl
 **/

const MessagesControl = (props) => {
  const {
    sendMessage,
    value,
    typing,
    onChange,
    groupMessage,
    sortNames,
    username,
    receiver,
    setMedia,
    onChatClose,
    media,
    seeAllUsers,
  } = props;

  const [id , setId] = useState('')
  const [conversationId , setConversationId] = useState('')
  const [prevMsg , setPrevMsg] = useState([])
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState(false);
  const[loader, setLoader] = useState(false);

  const handleClose = () => setShow(false);



  async function onCreateUserUsingId(e){
    setLoader(true)
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id})
    };
    console.log(requestOptions)
    const response = await fetch('http://liuyangtong.herokuapp.com/conversation/verify', requestOptions)
    const res = await response.json()
    setPrevMsg(res.messages)
    setLoader(false)
    setShow(true)
  } 

  const messages = groupMessage
    ? groupMessage[sortNames(username, receiver)]
    : [];

    //i am tasked to stop conversation , store messages and time
  const holdConversation = async()=>{
    setLoader(true)
    let sort =sortNames(username, receiver)
      //get the group messages in an array
      let messageArray = groupMessage[sort]
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: receiver,
          messages : messageArray
        })
      };
      console.log(requestOptions)
      const response = await fetch('http://liuyangtong.herokuapp.com/hold-conversation', requestOptions)
      const res = await response.json()
      setConversationId(res.id)
      setLoader(false)
      setAlert(true)
      
      
  }

  return (
    <div>
       {alert === true 
       ?(
        <Alert variant="success" onClose={() => setAlert(false)} dismissible>
        <Alert.Heading>Conversation saved !</Alert.Heading>
        <p>
        {conversationId} (conversation id)
        </p>
      </Alert>
       )
       : null

       }
       {loader === true
         ?(
          <Alert variant="info" onClose={() => setAlert(false)} dismissible>
          <div className="text-center">
           <Spinner animation='border'></Spinner>
          </div>
          </Alert>
         )
         : null

       }
      <div className="online-users-header"  style={{ backgroundColor: '#ed712f', border:'1px solid #ed712e ' }}>
        <div style={{ margin: "0 10px" }}>
          { receiver }
        </div>
        <div style={{ margin: "0 10px", cursor: "pointer" }}>
          {username !== 'customer service' ?
             <img onClick={onChatClose} width={10} src={cancel} alt="close" /> 
           :
          (<span>
            <a onClick={seeAllUsers}  style={{ marginRight : '20px' }} className='text-white'  alt="close">close</a>
            <a onClick={holdConversation} className="text-white"> hold </a>
        </span>)
          }
        </div>
      </div>
      <div className="message-area">
        <ul>
          {messages && messages.length > 0
            ? messages.map((msg, index) => (
                <li
                  style={{
                    flexDirection:
                      username === msg.receiver ? "row" : "row-reverse",
                  }}
                  key={index}
                >
                  <div className="user-pic">
                    <img src={require(`../users/${msg.avatar}`).default} />
                  </div>
                  <div>
                    {msg.media && msg.media.image ? (
                      <div className="image-container">
                        <img src={msg.media.content} width="200" alt="" />
                      </div>
                    ) : null}
                    {msg.message !== "" ? (
                      <div className="message-text">{msg.message}</div>
                    ) : null}
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
      <div>
        {media !== null ? (
          <div className="attachement-display">
            <img src={image} alt={""} />
            <span className="attachment-name">{media.name}</span>
            <span className="remove-attachment">x</span>
          </div>
        ) : null}

        <form onSubmit={sendMessage} className="message-control">
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Type something...!"
          />
          <div className="file-input-container">
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  console.log(reader.result);
                  setMedia({
                    image: true,
                    content: reader.result,
                    name: file.name,
                  });
                };
                reader.onerror = function (error) {
                  console.log(error);
                };
              }}
              id="hidden-file"
            />
            <label htmlFor="hidden-file">
              <img width="20" src={attachment} alt={""} />
            </label>
          </div>
          <button  style={{ backgroundColor: '#ed712f', border:'1px solid #ed712e ' }}>
            <img src={sendIcon} />
            <span style={{ display: "inline-block" }} >Send</span>
          </button>
        </form>
      </div>




            <div className="text-center m-2">
            <form onSubmit={onCreateUserUsingId} style={{ display: "inline-block" }}>
              <small className="username-label fs-8">Enter id to see previous conversation</small>
              <input className="input form-control" onChange={(e)=> setId(e.target.value)} />
            </form>
            </div>
            <div className="">
            
             <div>
                <Modal show={show} backdrop={true}  onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Previous chat messages
                      <p className="m-1" style={{ fontSize : '10px' }}>{id}</p>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <div className="message-area">
                    <ul>
                      {prevMsg && prevMsg.length > 0
                        ? prevMsg.map((msg, index) => (
                            <li
                              style={{
                                flexDirection:
                                  'customer service' === msg.sender ? "row-reverse" : "row",
                              }}
                              key={index}
                            >
                              <div className="user-pic">
                                <img src={require(`../users/${msg.avatar}`).default} />
                              </div>
                              <div>
                                {msg.media && msg.media.image ? (
                                  <div className="image-container">
                                    <img src={msg.media.content} width="200" alt="" />
                                  </div>
                                ) : null}
                                {msg.message !== "" ? (
                                  <div className="message-text">{msg.message}</div>
                                ) : null}
                              </div>
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                  </Modal.Body>
                </Modal>
            </div>
            </div>


            
    </div>
    
  );
};

export default MessagesControl;
