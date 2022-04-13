import "./App.css";
import { io, Socket } from "socket.io-client";
import logo from "./assets/chat.png";
import { useEffect, useRef, useState } from "react";
import CreateUser from "./components/CreateUser";
import OnlineUsers from "./components/OnlineUsers";
import MessagesControl from "./components/MessagesControl";
import Index from "./components/Index";
import SelectForm from "./components/SelectForm";
import EndChatWindow from "./components/EndChatWindow";
import NoAppointment from "./components/NoAppointment";
import useSound from 'use-sound';
import boopSfx from './assets/sounds/boop.mp3';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const socket = io(`http://liuyangtong.herokuapp.com`);





function App() {
  const [play] = useSound(boopSfx);
  const [step, setStep] = useState(-2);
  const[user , setUser] = useState()
  const [username, setUsername] = useState("");
  const [receiver, setReceiver] = useState("");
  const [avatar, setAvatar] = useState("");
  const [media, setMedia] = useState(null);
  const [users, setUsers] = useState({});
  const [message, setMessage] = useState("");
  const [groupMessage, setGroupMessage] = useState({});
  const receiverRef = useRef(null);
  const [startDate ,setStartDate] = useState('')
  const [seconds ,setSeconds] = useState(0)
  const [timeouta, setTimeoutA]= useState(0)
  const[frm ,setFrm] = useState('')
  const [ cs , setCs] = useState(false)
  const[resmsg, setResMsg] = useState('')
  const[currentName , setCurrentName] = useState('')
  const sortNames = (username1, username2) => {
    return [username1, username2].sort().join("-");
  };


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setCurrentName(foundUser.username)
      setUsername(foundUser.username)
      console.log(foundUser)
      setStep(0)
    }
    else{
      setStep(-2)
    }
  }, []);

  

  let audio = new Audio(boopSfx)
  const start = () => {
    audio.play()
  }
//get url parameters
if(step === -2){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const statemsg = urlParams.get('state')

  //console.log(statemsg)
  
  if(statemsg){
        ali()
        async function ali(){
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: statemsg})
            };
            //console.log(requestOptions)
            const response = await fetch('http://liuyangtong.herokuapp.com/appointment/verify', requestOptions)
            const res = await response.json()
            if(res.type === 'success'){
    
              setStep(0)
            }else{
             
                setResMsg(res.msg)
                setStep(-3)
              
            }
      }
    }else{
        
    }
}

      
  
  
  
  
  const gotoBottom = () => {
    const el = document.querySelector(".message-area ul");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };



  
  const nextPage = ()=>{
    setStep(-1);
  }
  
  const startConversation = (name)=>{
    setCurrentName(name)
    setUsername(name)
    setStep(0);
  }
  
  const onCreateUser = () => {
    console.log(username);
    socket.emit("new_user", username);
    const a = parseInt(Math.floor(Math.random() * 8) + 1) + ".png";
    setAvatar(a);

    setStep((prevStep) => prevStep + 1);
  };






  


  const onUserSelect = (username) => {
    setStartDate(new Date())
    setReceiver(username);
    receiverRef.current = username;
    setStep((prevStep) => prevStep + 1);
  };

  const onChatClose = () => {
    setStep(3);
    let endDate, seconds
    endDate   = new Date();
    setSeconds( (endDate.getTime() - startDate.getTime()) / 1000);
    setStartDate('') 
    receiverRef.current = null;
  };

  const seeAllUsers = ()=>{
    setStep(1);
    receiverRef.current = null;
  }

  const sendMessage = (e) => {
    e.preventDefault();
    

    const data = {
      sender: username,
      receiver,
      message,
      media,
      avatar,
      view: false,
    };

    //here we are sending
    socket.emit("send_message", data);

    const key = sortNames(username, receiver);
    const tempGroupMessage = { ...groupMessage };
    if (key in tempGroupMessage) {
      tempGroupMessage[key] = [
        ...tempGroupMessage[key],
        { ...data, view: true },
      ];
    } else {
      tempGroupMessage[key] = [{ ...data, view: true }];
    }

    setGroupMessage({ ...tempGroupMessage });

    if (media !== null) {
      setMedia(null);
    }

    setMessage("");

    // rizwan, ana [rizwan-ana] => [m1, m2, m3], ana-rizwan
    // rizwan, sachin [rizwan-sachin] => [m1, m2, m3]
    //ana, sachin [ana-sachin] => [m1, m2, m3]
  };

  const checkUnseenMessages = (receiver) => {
    const key = sortNames(username, receiver);
    let unseenMessages = [];
    if (key in groupMessage) {
      unseenMessages = groupMessage[key].filter((msg) => !msg.view);
    }

    return unseenMessages.length;
  };

  useEffect(() => {
    socket.on("all_users", (users) => {
      console.log({ users });
      setUsers(users);
    });

    socket.on("new_message", (data) => {
      console.log(data);
      console.log({ rec: receiverRef.current, data }, "asfedfee");
      console.log(start())
      start()
      toast(data.sender+' : '+data.message)

      setGroupMessage((prevGroupMessage) => {
        const messages = { ...prevGroupMessage };
        const key = sortNames(data.sender, data.receiver);

        

        if (receiverRef.current === data.sender) {
          data.view = true;
        }

        if (key in messages) {
          messages[key] = [...messages[key], data];
        } else {
          messages[key] = [data];
        }

        return { ...messages };
      });
    });
  }, []);

  useEffect(() => {
    //here we are going to update view count of selected user = receiver
    updateMessageView();
    
  }, [receiver]);

  const updateMessageView = () => {
    const key = sortNames(username, receiver);
    if (key in groupMessage) {
      const messages = groupMessage[key].map((msg) =>
        !msg.view ? { ...msg, view: true } : msg
      );

      groupMessage[key] = [...messages];

      setGroupMessage({ ...groupMessage });
    }
  };

  useEffect(() => {
    const key = sortNames(username, receiver);
    if (key in groupMessage) {
      if (groupMessage[key].length > 0) {
        gotoBottom();
      }
    }
  }, [groupMessage]);

  console.log(groupMessage);

 

  

  return (
    <div className="App">
      <header className="app-header">
        <img src={logo} alt="" />
        <div className="app-name b-500 primaryColor">Liuyangtong</div>
      </header>

      <div className="chat-system">
        <div className="chat-box">
          {/* notify */}
           <ToastContainer />
           {/* step1:  ask user if he wants to chat with specialist */}
           {step === -3 ? (
            <NoAppointment
            msg = {resmsg}
            />
          ) : null}
          {/* step1:  ask user if he wants to chat with specialist */}
          {step === -2 ? (
            <Index
            onClick = {nextPage}
            users = {users}
            startConversation = {startConversation}
            cs = {cs}
            />
          ) : null}
           {/* step1:  ask user if he wants to chat with specialist */}
           {step === -1 ? (
            <SelectForm
            startConversation = {startConversation}
            />
          ) : null}
          {/* step1:  ask username ro email */}
          {step === 0 ? (
            <CreateUser
              onCreateUser={onCreateUser}
              value={currentName}
              //onChange={(e) => setUsername(e.target.value)}
              
            />
          ) : null}
          {/* Step2: show all available users */}
          {step === 1 ? (
            <OnlineUsers
              onUserSelect={onUserSelect}
              users={users}
              username={username}
              checkUnseenMessages={checkUnseenMessages}
              startConversation = {startConversation}
              nextPage = {nextPage}
            />
          ) : null}
          {/* Step3: select user and switch to chat window */}
          {step === 2 ? (
            <MessagesControl
              value={message}
              onChange={(e) =>
                 {setMessage(e.target.value)
                }
                }
              sendMessage={sendMessage}
              groupMessage={groupMessage}
              sortNames={sortNames}
              username={username}
              receiver={receiver}
              setMedia={setMedia}
              seeAllUsers = {seeAllUsers}
              onChatClose={onChatClose}
              media={media}
              
            />
          ) : null}


           {/* Step3: select user and switch to chat window */}
           {step === 3 ? (
            <EndChatWindow
            seconds = {seconds}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
