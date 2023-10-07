import React from "react";
import GroupList from "../Components/GroupList";
import Header from "../Components/Header";
import "../styles/scrollbar.css"
import MoreProfiles from "../Components/MoreProfiles";
import RecentActivityies from "../Components/RecentActivityies";
import TimelinePost from "../Components/TimelinePost";
import GroupMembers from "./GroupMembers";
import "../styles/font.css"

import UploadPostOntimeline from "./UploadPostOntimeline";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../admin/ActiveUser"

export default function Selectedgroup(props) {
  const [Group, SetGroup] = useState(false);
  const [name, setName] = useState(false);
  const [pic, setpic] = useState(false);
  const {group, setActiveGroup } = useContext(AuthContext);
  const {id, setActiveId } = useContext(AuthContext);
  const api = axios.create({
    baseURL : 'http://localhost:8000'
  });
  
  
  useEffect (()=>{
    memberpic();
  },[]) 
   // getting all posts
   const memberpic = async () => {

    let res = await api.get('/groups/getgroupbyId/'+group)
    .then ( (res) => {
      
      if (res.data.data !== res.data.data.Prototype){
        let group = (res.data.data);
        SetGroup(group);
      }
      }
    )
    .catch((error) => {
        console.log(error);
    })
  }


  
  
   // getting players from database
  const data = async () => {
    console.log("in data")
    let res = await api.get('/coach/getcoachByEmail/'+id)
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setName(res.data.data.name);
        setpic(res.data.data.image);
        console.log(name)

      }})
    .catch((error) => {
        console.log(error.response.data);
        
    })
  };
  
  return (
    <div className="flex-col w-full ">
      {/* Page Header */}
      <Header title={Group.name} />
      <div className="flex  divide-x divide-[#7E7E7E] h-screen">
        {/* left side-bar details  */}
        <div className="w-1/4 ml-6 mt-10 mr-2">
          <GroupMembers/>
        </div>

        {/* center Post */}
        <div className=" w-full overflow-y-scroll scrollbar  mt-10">
         <UploadPostOntimeline newsfeed = {false} name = {name} image = {pic}/>
          <TimelinePost newsfeed = {false}/>
        </div>

        {/* right side-bar parent profile */}

        <div className="mr-8 w-4/12  mt-10 pl-8">
          <MoreProfiles />
          <GroupList/>
        </div>
      </div>
    </div>
  );
}
