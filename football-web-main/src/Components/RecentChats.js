import React, {useState, useEffect, useContext} from "react";
import "../styles/font.css"
import axios from '../axios';
import { AuthContext } from "../admin/ActiveUser"
import Moment from 'react-moment';
export default function RecentChats(props) {
  const [players, setPlayers] = useState(false);
  const [admin, setAdmin] = useState(false);
  const[coach,setCoach] = useState(false);
  const [data, setData] = useState(false);
  const {id, setActiveId } = useContext(AuthContext);
  const [arrayCopy, setArrayCopy] = useState(false);
  const [arrayCopyAdmin, setArrayCopyAdmin] = useState(false);
  const [arrayCopyCoach, setArrayCopyCoach] = useState(false);
  const [arrayCopyData, setDataCopy] = useState(false);
  const[search, setSearch] = useState(false);
  var today = new Date();
  let dateToday = today. getFullYear()+ '-' + parseInt(today. getMonth() + 1) + '-' + today. getDate() ;
 
  
     // getting messages from database
     const AllMessages = async () => {
      console.log("in messages")
      let res = await axios.get('/chat/getAllChats/'+id)
      .then((res) => {
        setData(res.data);
        })
      .catch((error) => {
          console.log(error.response.data);
        })
    }

  // getting players from database
  const allPlayers = async () => {
    let res = await axios.get('/player/getplayers')
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setPlayers(res.data.data);
        allAdmin();

      }
        
    })
    .catch((error) => {
        console.log(error.response.data);
      })
  }
  //allPlayers()
  // getting admins from database
  const allAdmin = async () => {
    let res = await axios.get('/admin/getadmin')
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        let adminn = res.data.data
        setAdmin(adminn.filter((val) => {
          return val.email != id}));
        allCoach();

      } 
    })
    .catch((error) => {
        console.log(error.response.data);
      })
  }

  // getting coach from database
  const allCoach = async () => {
    let res = await axios.get('/coach/getcoach')
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setCoach(res.data.data);


      } 
    })
    .catch((error) => {
        console.log(error.response.data);
      })
  }

  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearch(event.target.value);
    let all = [...data.filter(checkChats)]
    setDataCopy(all);
    
    handlePlayersSearch()
    
  };
  const handlePlayersSearch = (event) => {
    setArrayCopy([... players.filter(checkNames)]);
    handleAdminSearch();
    
  };
  const handleAdminSearch = (event) => {
   
    setArrayCopyAdmin([... admin.filter(checkNames)]);
    handleCoachSearch()
    
  };
  const handleCoachSearch = (event) => {
   
    setArrayCopyCoach([... coach.filter(checkNames)]);
  };

  const checkNames = (val) => {
      if (val.name.toUpperCase().includes(search.toUpperCase())){
        return val.name;
      }
  }
  const checkChats = (val) => {
    if (val.reciever.toUpperCase().includes(search.toUpperCase())){
      return val.reciever;
    }
}
const allAdmins = async () => {
  let res = await axios.get('/admin/getadminByEmail/'+id)
  .then((res) => {
    if (res.data.data !== res.data.data.Prototype){
      let adminn = res.data.data
      props.setSenderName(adminn.name)
      props.setSenderImg(adminn.image)
      props.setSenderPosition("admin");
      props.setSenderPhone(adminn.phone);
    }
    
  })
  .catch((error) => {
      console.log(error.response.data);
    })
}

const AllMsgs = async (to) => {
  console.log("in messages")
  let res = await axios.get('/chat/getmessage/'+id+"/"+to)
  .then((res) => {
    props.setChat(res.data);
    })
  .catch((error) => {
      console.log(error.response.data);
    })
}

const selectChat = (val, status) => {
  if (status.toString() !== "chat"){
    props.setState(status);
    props.setRecieverName(val.name)
    props.setTo(val.email)
    props.setPhone(val.phone.toString())
    if (val.image){
      props.setImg(val.image)
    }else{props.setImg(false)}
    if(status.toString() === "player"){
      props.setPosition(val.position)
    }else{props.setPosition(status)}
    AllMsgs(val.email);
  }else {
    props.setState(val.status);
    props.setRecieverName(val.reciever)
    props.setImg(val.img)
    props.setTo(val.to)
    props.setPhone(val.phone.toString())
    props.setPosition(val.position)
    AllMsgs(val.to);
  }
  allAdmins()
  
}

    useEffect (()=>{
    AllMessages();
    allPlayers();
    
  },[])

  return (
    <>
      <div className="">
        <div className="font-lexend mt-12 ">
          <div className="relative">
            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5  text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              class="bg-[#212121]  text-[rgba(255, 255, 255, 0.53)] text-sm text-white rounded-md w-full pl-10 p-2.5   placeholder-gray-400"
              placeholder="Search User"
              required=""
              onChange={handleSearchChange}
            />
          </div>

          <div>
            {arrayCopyData || arrayCopyAdmin || arrayCopyCoach || arrayCopy? (<>

{/* checking chats */}
{arrayCopyData? (<>
                {arrayCopyData.map((val, ind) => {
                  
                  return (
                    
                    <div className=" mt-10 mb-8" onClick={() => {selectChat(val, "chat")}}>
                      <div className="flex w-full">
                        {val.img !== "no image"?(<>
                          <img
                          class=" w-12 h-12 rounded-full "
                          src={val.img}
                          alt="Bonnie image"
                        />
                        </>): (<><div class=" w-12 h-12 rounded-full bg-white"></div></>)}
                        <div>
                      <div className="flex-1 grow-1 ml-3">
                      <h5 class="text-lg font-lexend font-medium tracking-tight  text-white">
                        {val.reciever}
                      </h5>
                    <p class="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                        {val.messg.slice(0,25)}
                      </p>
                      </div>
                      
                    </div>
                    <div>
                    <p class="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                        <Moment fromNow>{val.date}</Moment>
                      </p>
                      
                    </div>
                      </div>
                    </div>
                  );
                })}
              </>): (<></>)}

{/* checking admin */}
              {arrayCopyAdmin? (<>
                {arrayCopyAdmin.map((val, ind) => {
                  
                  return (
                    
                    <div className=" mt-10 mb-8" onClick = {() => {selectChat(val, "admin")}}>
                      <div className="flex w-full">
                        {val.image?(<>
                          <img
                          class=" w-12 h-12 rounded-full "
                          src={val.image}
                          alt="Bonnie image"
                        />
                        </>): (<><div class=" w-12 h-12 rounded-full bg-white"></div></>)}
                        <div>
                          <div className="flex-1 grow-1 ml-3">
                          <h5 class="text-lg font-lexend font-medium tracking-tight  text-white">
                            {val.name}
                          </h5>
                        
                          </div>
                          
                        </div> 
                      </div>
                    </div>
                  );
                })}
              </>): (<></>)}

{/* checking player */}
              {arrayCopy? (<>
                {arrayCopy.map((val, ind) => {
                  
                  return (
                    
                    <div className=" mt-10 mb-8" onClick = {() => {selectChat(val, "player")}}>
                      <div className="flex w-full">
                        {val.image?(<>
                          <img
                          class=" w-12 h-12 rounded-full "
                          src={val.image}
                          alt="Bonnie image"
                        />
                        </>): (<><div class=" w-12 h-12 rounded-full bg-white"></div></>)}
                        <div>
                          <div className="flex-1 grow-1 ml-3">
                          <h5 class="text-lg font-lexend font-medium tracking-tight  text-white">
                            {val.name}
                          </h5>
                        
                          </div>
                          
                        </div> 
                      </div>
                    </div>
                  );
                })}
              </>): (<></>)}
{/* checking coach */}
{arrayCopyCoach? (<>
                {arrayCopyCoach.map((val, ind) => {
                  
                  return (
                    
                    <div className=" mt-10 mb-8" onClick = {() => {selectChat(val, "coach")}}>
                      <div className="flex w-full">
                        {val.img?(<>
                          <img
                          class=" w-12 h-12 rounded-full "
                          src={val.img}
                          alt="Bonnie image"
                        />
                        </>): (<><div class=" w-12 h-12 rounded-full bg-white"></div></>)}
                        <div>
                          <div className="flex-1 grow-1 ml-3">
                          <h5 class="text-lg font-lexend font-medium tracking-tight  text-white">
                            {val.name}
                          </h5>
                        
                          </div>
                          
                        </div> 
                      </div>
                    </div>
                  );
                })}
              </>): (<></>)}
            </>): (<>
              {data ? (<>
                {data.map((val, ind) => {
                  
              return (
                
                <div className=" mt-10 mb-8" onClick = {() => {selectChat(val, "chat")}}>
                  <div className="flex w-full">
                    {val.img.toString() !== "false"?(<>
                      <img
                      class=" w-12 h-12 rounded-full "
                      src={val.img}
                      alt="Bonnie image"
                    />
                    </>): (<><div class=" w-12 h-12 rounded-full bg-white"></div></>)}
                    <div>
                      <div className="flex-1 grow-1 ml-3">
                      <h5 class="text-lg font-lexend font-medium tracking-tight  text-white">
                        {val.reciever}
                      </h5>
                    <p class="font-normal font-lexend text-sm  mt-0 text-[#777777]">
                        {val.messg.slice(0,25)}
                      </p>
                      </div>
                      
                    </div>
                    <div>
                      <div className="flex-1 grow-0 ">

                      
                        <p class="font-medium ml-[20px] text-xs mt-2 text-[#777777]">
                        <Moment fromNow>{val.date}</Moment>
                      </p>
                      
                      </div>
                    </div>
                    
                      
                      
                      
                    
                  </div>
                </div>
              );
            })}
              </>): (<></>)}</>)}
            
            
          </div>
        </div>
      </div>
    </>
  );
}
