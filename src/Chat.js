import { MicNone } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css"
import { selectChatId, selectChatName } from "./features/chatSlice";
import Message from "./message";
import db from './firebase'
import firebase from 'firebase/compat/app';
import {selectUser} from './features/userSlice'
import FlipMove from "react-flip-move"

function Chat() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const chatName = useSelector(selectChatName);
    const chatId = useSelector(selectChatId);
    console.log(user);
    useEffect(() => {
      if (chatId) {
        db.collection('chats')
          .doc(chatId)
          .collection('messages')
          .orderBy('timestamp', 'asc')
          .onSnapshot((snapshot) =>
            setMessages(
              snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
            )
          );
      }
    }, [chatId]);
  
    const sendMessage = (e) => {
      e.preventDefault();
      db.collection('chats').doc(chatId).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
      setInput('');
    };
  
    return (
      <div className="chat">
        <div className="chat__header">
          <h4>
            To: <span className="chat__name">{chatName}</span>
          </h4>
          <strong>Details</strong>
        </div>
  
        {/* Chat  messages */}
        <div className="chat__messages">
          <FlipMove>
            {messages.map(({ id, data }) => (
              <Message key={id} id={id} contents={data} />
            ))}
          </FlipMove>
        </div>
  
        {/* Chat  input*/}
        <div className="chat__input">
          <form>
            <input
              type="text"
              placeholder="iMessage"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
          </form>
          <IconButton>
            <MicNone />
          </IconButton>
        </div>
      </div>
    );
  }
  
  export default Chat;
