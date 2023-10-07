import React, { useState, useEffect } from "react";
import ItemsRightSidebar from "./ItemsRightSideBar";
import Header from "../../Components/Header";
import "../../styles/font.css"
import Minus from "../../assets/Minus.png"
import { NavLink } from "react-router-dom";
import axios from '../../axios';



export default function Items() {

  const [allItems, setAllItems] = useState(false);
  const [searchItem, setSearchItem] = useState(false);
  const [searchItemCopy, setSearchItemCopy] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(false);
  const[quantity, setQuantity] = useState(false);
  const[status, setStatus] = useState(false);
  const[price,setPrice] = useState(false);

  useEffect (()=>{
    data();
  },[])

   // getting items from database
   const data = async () => {
    console.log("in data")
    let res = await axios.get('/shop/getItems')
    .then((res) => {
      if (res.data.data !== res.data.data.Prototype){
        setAllItems(res.data.data);

      }})
    .catch((error) => {
        console.log(error.response.data);
        
    })
  };

  // searching
  const handleSearchChange = (event) => {
    // 👇 Get input value from "event"
    setSearchItem(event.target.value);
    searchInItem();
    
  };
  
  const searchInItem = () => {
    setSearchItemCopy([... allItems.filter(checkNames)]);
  }
  
  const checkNames = (val) => {
      if (val.name.toUpperCase().includes(searchItem.toUpperCase())){
        return val.name;
      }
  }

// adding members in the group
const additem = (index) => {
  let arr = [... allItems];
  arr.map((val, ind) => {
    if (val.isitem === true){
      val.isitem = false;
    }
  })
  arr[index].isitem = true;
  setAllItems(arr);
  Item(index);
  
}

// // removing members from the group
// const removeitem = (index) => {
//   let arr = [... allItems];
//   arr[index].isitem = false;
//   setAllItems(arr);

// }

const Item = (ind) => {
  setName(allItems[ind].name);
  setImage(allItems[ind].image);
  setQuantity(allItems[ind].quantity);
  setPrice(allItems[ind].price);
  if (quantity !== 0){
    setStatus("Available (In Stock)");
  }
  else{
    setStatus("Out of Stock");
  }
  
}

  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"All Items"}  />

        <div className="flex  divide-x xl:w-full ">
          {/* Upload Of user  */}
          <div className="w-full pr-12">
            <h3 className="text-xl font-medium text-white font-lexend whitespace-nowrap  ml-9 mt-[32px]"> Items</h3>
            
            {/*head  */}
            <div className="flex">
                <div className="flex-1 grow-1">
                    {/* search button */}
                <form class="flex items-center w-1/2 ml-9 mt-4">

                    <div class="relative w-full font-dm">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-500 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        class="bg-[#212121]  text-white  text-sm rounded-lg block w-full pl-10 p-2.5   border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search Items"
                        required=""
                        onChange={handleSearchChange}
                    />
                    </div>
                    <NavLink to="/allItems">
                    <button
                    type="submit"
                    class="inline-flex font-dm items-center font-lexend py-2 px-5 ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                    onClick={searchInItem}
                    >
                    Search
                    </button>
                    </NavLink>
                    


                    </form>
                </div>

                 <div className="flex-1 grow-0 mt-2">
                 
                 <NavLink
                to={"/allItems/addItem"}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center  text-base font-normal p-1.5 rounded-lg border-2 border-green-500 border-line "
                    : "flex items-center text-base font-normal  p-1.5 rounded-lg border-dashed"
                }
            
              >
                <button
                    type="submit"
                    class=" font-dm items-center w-40 py-2  ml-4 text-sm font-normal text-white bg-green-500 rounded-[4px] "
                    >
                    Add Item
                    </button>
                    </NavLink>
                 
                 </div>

          
            </div>

{/* Latest Orders  */}
      <div className="ml-6 p-3 mt-10">
      
      <table class="font-dm w-full text-md text-center justify-items-center text-white items-center">
            <thead class=" font-dm text-base font-normal text-[#7E7E7E]  border-b border-[#7E7E7E]">
              <tr className="text-center ">
                <th scope="col" class="py-3 pl-3">
                <div className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md">
                    <div className="m-auto my-auto">
                    <img className="mx-auto " src = {Minus} />
                    </div>
                    
                </div>
                


                </th>
                <th scope="col" class="py-3 pl-2">
                  Name
                </th>
                <th scope="col" class="py-3 pl-2">
                  Price
                </th>
                <th scope="col" class="py-3 pl-2">
                  Status
                </th>
                <th scope="col" class="py-3 pl-2">
                  Items Left
                </th>
                <th scope="col" class="py-3 pl-2">
                  Revenue
                </th>
                
                
              </tr>
            </thead>

            {allItems !== false? (<>
            {searchItemCopy ? 
// if searched
            (<>
            {searchItemCopy.map((val, ind) => (
                <tbody>
                    <tr class="font-dm text-center border-b border-[#7E7E7E] justify-items-center"
                    >
                  <th
                    scope="row"
                    class="py-4 px-3 font-medium whitespace-nowrap text-white"
                  >
                   

        {val.isitem === true ? (
              <>
              
                <div className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md"
                      //  onClick={() => {removeitem(ind)}}
                      >
                    <div className="m-auto my-auto">
                    <img className="mx-auto " src = {Minus} />
                    </div>
                    
                </div>     
              </>
            ) : (
              <button className="bg-[#424242] h-5 w-5 grid place-items-center rounded-md"
                      onClick={() => {additem(ind)}} 
                         >
                </button>
            )}
                        
                    
                  </th>
                  <td class="py-4 pl-8 ">
                    <div className="flex gap-2 items-left justify-center ml-24 pl-3">
                      
                     <div className="flex">
                        <div className="flex-1 rounded-md mr-6">
                        <img className=" rounded-md w-10 h-10" src = {val.image} />

                        </div>
                        <div className="p-3 ">
                            <p>{val.name}</p>
                        </div>
                     </div>
                    </div>
                  </td>
                  <td class="py-4 ">£{val.price}</td>
                  {val.quantity !== 0 ? (<>
                    <td class="py-4 text-[#818181] ">Available</td>
                  </>) : (<>
                    <td class="py-4 text-[#818181] ">Out of Stock</td>
                  </>)}
                  
                  <td class="py-4 ">{val.quantity}</td>
                  <td class="py-4 mx-auto">
                  £5000.56
                  
                  </td>
                </tr>
                

                </tbody>
                 
                    

                
              ))}
            </>) : 
// if not searched
            (<>
            {allItems.map((val, ind) => (
                <tbody>
                    <tr class="font-dm text-center border-b border-[#7E7E7E] justify-items-center">
                  <th
                    scope="row"
                    class="py-4 px-3 font-medium whitespace-nowrap text-white"
                  >
                   

        {val.isitem === true ? (
              <>
              
                <div className="bg-[#DAD3FF] h-5 w-5 grid place-items-center rounded-md"
                      //  onClick={() => {removeitem(ind)}}
                      >
                    <div className="m-auto my-auto">
                    <img className="mx-auto " src = {Minus} />
                    </div>
                    
                </div>     
              </>
            ) : (
              <button className="bg-[#424242] h-5 w-5 grid place-items-center rounded-md"
                      onClick={() => {additem(ind)}} 
                         >
                </button>
            )}
                        
                    
                  </th>
                  <td class="py-4 pl-8 ">
                    <div className="flex gap-2 items-left justify-center ml-24 pl-3">
                      
                     <div className="flex">
                        <div className="flex-1 rounded-md mr-6">
                        <img className=" rounded-md w-10 h-10" src = {val.image} />

                        </div>
                        <div className="p-3 ">
                            <p>{val.name}</p>
                        </div>
                     </div>
                    </div>
                  </td>
                  <td class="py-4 ">£{val.price}</td>
                  {val.quantity !== 0 ? (<>
                    <td class="py-4 text-[#818181] ">Available</td>
                  </>) : (<>
                    <td class="py-4 text-[#818181] ">Out of Stock</td>
                  </>)}
                  
                  <td class="py-4 ">{val.quantity}</td>
                  <td class="py-4 mx-auto">
                  £5000.56
                  
                  </td>
                </tr>
                

                </tbody>
                 
                    

                
              ))}
            </>)}
              

            </>) : (<></>)}
            

                
               
          </table>
      </div>
      {/* Side bar */}
            
            
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12 border-[#7E7E7E]">
            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
                return <ItemsRightSidebar name = {name} image = {image} quantity = {quantity} price = {price} status = {status}/>;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
