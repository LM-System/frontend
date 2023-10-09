'use client'
import React from 'react'
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState,useEffect } from "react";
import Navbar from '@/app/components/Navbar/Navbar';
import Cookies from "js-cookie";



const socket = io.connect("http://localhost:5000");

function page({params}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const roomId = params.roomId
    const userInfo = JSON.parse(Cookies.get("user_info"));
    const senderId=`${userInfo.id}${userInfo.role == 'student'?'1':'2'}`
    console.log(userInfo);
    console.log(senderId);


    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            sender_id:1,
            room_id:roomId,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
    
          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
    };

    useEffect(()=>{
        socket.emit("join_room", roomId);
        socket.on('prev_messages',(data)=>{
            setMessageList(data)
        })
        socket.on("receive_message", (data) => {
            setMessageList((list) => Array.from(new Set([...list, data])));
        });
    },[socket])
    useEffect(()=>{
            socket.emit('save_data',[messageList,roomId])
    },[messageList])
  return (
    <div className='page'>
        <Navbar/>
        <main className='main'>
        <div>
      <div>
        <p>Live Chat</p>
      </div>
      <div>
        <ScrollToBottom>
          {messageList.map((messageContent) => {
            return (
              <div
                // className="message"
                // id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div>
                    <p>{messageContent.message}</p>
                  </div>
                  <div>
                    <p >{messageContent.time}</p>
                    <p >{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div>
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
        </main>
    </div>
  )
}

export default page