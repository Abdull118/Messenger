import { RateReviewOutlined, Search } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Sidebar.css"
import SidebarChat from "./SidebarChat";
import db, {auth} from "./firebase";

function Sidebar(){
    const user = useSelector(selectUser)
    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection('chats').onSnapshot((snapshot) =>
          setChats(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });

    const addChat = () =>{

        const chatName = prompt('Please enter a chat name')

        if(chatName){
            db.collection('chats').add({
                chatName:chatName,
            })
        }
        
    
    }
    return <div className="sidebar">
           <div className= "header" >
            <Avatar 
            onClick={() => auth.signOut()}
            src={user.photo} 
            className ="avatar"/>
            <div className = "input">
                <Search />
                <input placeholder="Search" />
                
            </div>
            <div>
            <IconButton variant='outline' className ="sidebar_inputButtons">
            <RateReviewOutlined onClick ={addChat} />
            </IconButton>
            </div>
           </div>
           
            <div className= "chats" >
            {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
                ))}
                </div> 


    </div>
}

export default Sidebar;