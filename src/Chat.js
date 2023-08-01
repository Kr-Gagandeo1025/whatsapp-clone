import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, Search, Send } from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
function Chat() {
    const [input, setInput] = useState('');
    const [message,setMessage] = useState([]);
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().roomname)
                )
            );
            db.collection('rooms')
            .doc(roomId)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot(
                (snapshot) => (
                    setMessage(snapshot.docs?.map((doc) => doc.data()))
                ));
        }
    },[roomId])
    const sendMessage = (e) =>{
        e.preventDefault();
        console.log(input);
        db.collection('rooms').doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput('');
    };
  return (
    <div className='chat'>
        <div className='chat_header'>
            <Avatar/>
            <div className='chat_header_info'>
                <h3>{roomName}</h3>
                <p>last seen{" "}{new Date(
                    message[message.length-1]?.timestamp?.toDate()
                ).toUTCString()}</p>
            </div>
            <div className='chat_header_icons'>
                <IconButton>
                    <Search/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className='chat_body'>
            {message.map((message)=>(
            <p className={`chat_message ${ (message.name==user.displayName) && 'chat_receiver'} `}>
                <span className='chat_name'>{message.name}</span>
                {message.message}
                <span className='chat_time'>
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
            </p>          
            ))}
        </div>
        <div className='chat_footer'>
            <InsertEmoticon/>
            <form className='chat_writer'>
                <input type="text" placeholder='Type a message' value={input} onChange={(e)=>setInput(e.target.value)}/>
                <IconButton type="submit" onClick={sendMessage}>
                    <Send className="send_button"/>
                </IconButton>
            </form>
            <IconButton>
                <Mic/>
            </IconButton>
        </div>
    </div>
  )
}

export default Chat