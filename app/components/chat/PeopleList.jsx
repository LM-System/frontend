import React,{useState,useEffect} from 'react'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import Link from 'next/link'

function PeopleList({recieverId,id}) {
    const [chats,setChats]=useState([])
    const [peoplelist,setPeoplelist]=useState([])
    const [fetchingError,setFetchingError]=useState([])
    const arr = []
    const chatsArr = []

    
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/userchats/${id}`)
            if(data){
                setChats(data)
            }
        }catch(e){console.log(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        chats.map((chat)=>{
            if(!arr.includes(chat.room_id)){
                arr.push(chat.room_id)
                chatsArr.push(chat)
            }
        })
        setPeoplelist(chatsArr)

    },[chats])
  return (
    <div className='w-full'>
        <div className='p-5 text-lg font-bold bg-gray-800 text-white'>Chat</div>
        {peoplelist.map((item)=>{
            return(
                <Link href={`chat/${item.reciever_id==id?item.sender_name:item.reciever_name}/${item.reciever_id==id?item.sender_id:item.reciever_id}/${item.room_id}`}>
                <div className={`${item.sender_id == recieverId || item.reciever_id == recieverId?'':''}text-lg p-4 font-bold`}>
                    <h2 className='pb-0'>{item.reciever_id==id?item.sender_name:item.reciever_name}</h2>
                    <span className='text-sm font-thin pt-0'>{item.message}</span>
                    <br className='w-full h-1 bg-black'/>
                </div>
                </Link>
            )
        })
        }
    </div>
  )
}

export default PeopleList