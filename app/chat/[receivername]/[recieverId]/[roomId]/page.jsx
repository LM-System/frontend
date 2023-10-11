'use client'
import React from 'react'
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { useState,useEffect } from "react";
import Navbar from '@/app/components/Navbar/Navbar';
import Cookies from "js-cookie";
import PeopleList from '@/app/components/chat/PeopleList';



const socket = io.connect("http://localhost:4000");

function Page({params}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const {roomId,recieverId,receivername} = params
    const {id,fullname} = JSON.parse(Cookies.get("user_info"));
    

    console.log(receivername)
    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            sender_name:fullname,
            reciever_name:receivername,
            sender_id:id,
            reciever_id:recieverId,
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
  return (
    <div className='page'>
        <Navbar/>
        <main className='main bg-gray-100'>
          <div className='flex h-full border-2 border-gray-300 rounded-lg overflow-hidden'>
        <div className='w-9/12 h-full bg-white'>
        <h1 className=' font-bold text-2xl mx-6 my-4 pb-5 border-b-2'>{decodeURIComponent(receivername)}</h1>
      <div className='w-full h-5/6 overflow-y-auto flex flex-col '>
        <ScrollToBottom>
          {messageList.map((messageContent) => {
            return (
              <div className={`flex ${messageContent.sender_id==id?' justify-end':' justify-start'}  mx-5 my-2`}>
                <div>
                  <div className={`${messageContent.sender_id==id?'bg-blue-600 ':' bg-slate-200'} border-2 border-gray-200 shadow-lg px-8 text-black py-2.5 w-fit rounded-3xl`}>
                    <p className={`${messageContent.sender_id==id?'text-white':'text-black'}`}>{messageContent.message}</p>
                  </div>
                    <p className={`${messageContent.sender_id==id?'text-right pr-3':' text-left pl-3'} text-sm`}>{messageContent.time}</p>
                  <div>
                    <p >{messageContent.author}</p>
                  </div>
                  </div>
                </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='relative mx-6'>
        <input
          className='w-full h-1/6 py-3 border-t-2 '
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
        <button className='absolute right-0 bottom-2' onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
    <div className='w-3/12 h-full bg-indigo-100'>
      <PeopleList roomId={roomId} messageList={messageList} id={id} recieverId={recieverId} />
    </div>
    </div>
        </main>
    </div>
  )
}

export default Page