import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'

function PeopleList({recieverId,id,messageList,roomId}) {
    const [chats,setChats]=useState([])
    const [peoplelist,setPeoplelist]=useState([])
    const arr = []
    const chatsArr = []
    
    
    const fetchData = async ()=>{
        try{
            const {data}=await axios.get(`http://localhost:4000/userchats/${id}`)
            if(data){
                setChats(data)
            }
        }catch(e){console.log(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[messageList])
    useEffect(()=>{
        console.log(chats);
        if(chats){
            const reversedChat = chats.reverse()
            reversedChat.map((chat)=>{
                if(!arr.includes(chat.room_id)){
                    arr.push(chat.room_id)
                    chatsArr.push(chat)
                }
            })
            setPeoplelist(chatsArr)
        }
    },[chats])
  return (
    <div className='w-full'>
        <div className='p-5 text-lg font-bold bg-gray-800 text-white'>Chat</div>
        {peoplelist.map((item)=>{
            const link = `/chat/${item.reciever_id==id?item.sender_name:item.reciever_name}/${item.reciever_id==id?item.sender_id:item.reciever_id}/${item.room_id}`
            console.log(link)
            return(
                <Link href={link}>
                <div className={`${item.room_id == roomId ?'bg-indigo-200 z-10':''}text-lg p-4 font-bold border-b border-gray-400`}>
                    <h2 className='pb-0'>{item.reciever_id==id?decodeURIComponent(item.sender_name):decodeURIComponent(item.reciever_name)}</h2>
                    <span className='text-sm font-thin pt-0'>{item.message}</span>
                </div>
                </Link>
            )
        })
        }
    </div>
  )
}

export default PeopleList