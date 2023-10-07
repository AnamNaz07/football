import React from "react";
import "../styles/font.css"

export default function RightSideChat(props) {
  return (
    <>
      <div className=" mx-10 my-5">
        <div className="flex flex-row-reverse gap-2 px-5">
          
        {props.pic.toString() !== "false"?(<>
            <img class=" w-10 h-10 rounded-full " src={props.pic} alt="Bonnie image" />
          </>):(<>
          <div className=" w-10 h-10 rounded-full bg-white"></div>
          </>)}
          <div>
            <div className="flex flex-row-reverse justify-between mx2">
              <h5 class="text-lg font-normal tracking-tight text-white">
                {props.name}
              </h5>
              <p class="font-normal text-sm mt-0.5 mr-2 text-gray-400">
              {props.date.slice(11,16)}
              </p>
            </div>
            {props.image.toString() !== "no image"?(<>
              <img
              class=" mt-[34px] w-30 h-30 rounded-md "
              src={props.image}
            />
            </>):(<>
              {props.message?(<>
              <p class="font-medium bg-[#212121] text-base text-white mt-1  rounded-tr-lg rounded-b-lg py-2 px-6">
              {props.message}
            </p>
            </>):(<></>)}
            </>)}
          </div>
        </div>
      </div>
    </>
  );
}
