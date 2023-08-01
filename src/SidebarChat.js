import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material'
import { AddCircle} from '@mui/icons-material';
import db from './firebase';
import { BrowserRouter, Link } from 'react-router-dom';

function SidebarChat({addNewChat, id , name}) {
    const[seed,setSeed] = useState('');
    const[lastMessage,setLastMessage] = useState([]);
    useEffect(()=>{
        if(id){
            db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp","desc")
            .onSnapshot((snapshot)=>(
            setLastMessage(snapshot.docs?.map((doc)=>doc.data())
            )));
        }
    },[id]);
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[]);

    const createChat=()=>{
        const roomName = prompt("Enter Room Name");
        if(roomName){
            // do something
            db.collection("rooms").add({
                roomname: roomName,
            })
        }
    }
  return !addNewChat?(
    // <BrowserRouter>
    <Link to={`rooms/${id}`}>
        <div className='sidebar_chat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className='sidebar_chat_info'>
                <h3>{name}</h3>
                <p>{lastMessage[0]?.message}</p>
            </div>
        </div>
    </Link>
    // </BrowserRouter>
  ):(
    <div className='sidebar_chat_add' onClick={createChat}>
        <AddCircle/>
        <h4>Add New Chat</h4>
    </div>
  )
}

export default SidebarChat