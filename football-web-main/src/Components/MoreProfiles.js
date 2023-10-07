import React from "react";
import { useState, useEffect } from "react";
import "../styles/font.css";
import axios from '../axios';
import { NavLink } from "react-router-dom";
export default function MoreProfiles() {
  const [player, setPlayers] = useState(false)

  useEffect (()=>{
    allPlayers();
    
  },[])

  // getting players from database
  const allPlayers = async () => {
    let res = await axios.get('/player/getplayers')
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setPlayers(res.data.data);

      }
        
    })
    .catch((error) => {
        console.log(error.response.data);
      })
  }
  return (
    <>
      <div className=" flex ">
        <h4 class=" text-lg font-normal font-lexend whitespace-nowrap ml-2 text-white  ">
          More Profiles
        </h4>
        <a class="text-sm text-gray-500 ml-auto font-lexend">All</a>
      </div>
      <div className=" grid grid-cols-5 gap-x-2 mt-7">
    
        {player !== false? (<>
          {player.map((val, index) => {
                  
                  
                  return (<>
                  
                  {val.image? (<>
                  <NavLink to={"/userarea/playerprofile/profile"}>
                    <img
                  class="mb-3 w-10 h-10 rounded-full shadow-lg"
                  src={val.image}
                  alt="Bonnie image"
                  
          />
          </NavLink></>): (<>
            <NavLink to={"/userarea/playerprofile/profile"}>
                   
          <div class="mb-3 w-10 h-10 rounded-full shadow-lg bg-white" ></div>
          </NavLink>
          </>)}
          
              </>)})}
        </>): (<>
          </>)
          }
        
      </div>
    </>
    
  );
}
