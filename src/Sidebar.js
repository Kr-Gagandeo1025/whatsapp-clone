import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Sidebar() {
    const [{user},dispatch] = useStateValue();
    const [rooms,setRooms] = useState([]);
    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>{
            setRooms(snapshot.docs.map(doc =>({
                id:doc.id,
                data:doc.data(),
            })))
        });
        return () =>{
            unsubscribe();
        }
    },[]);
  return (
    <div className='sidebar_container'>
        <div className='sidebar_head'>
            <Avatar src={user?.photoURL}/>
            <h3>{user?.displayName}</h3>
            <div className='sidebar_right_icons'>
                <IconButton>
                    <DonutLarge/>
                </IconButton>
                <IconButton>
                    <Chat/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
        </div>
        <div className='sidebar_search'>
            <div className='sidebar_search_container'>
                <SearchOutlined/>
                <input placeholder='Search Chats' type='text'/>
            </div>
        </div>
        <div className='sidebar_chats'>
            <SidebarChat addNewChat/>
            {rooms.map(room =>(
                <SidebarChat id={room.id} key={room.id} name={room.data.roomname}/>
            ))}
        </div>

    </div>
  )
}

export default Sidebar