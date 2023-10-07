import React from "react";
import Header from "../Components/Header";
import PlayerProfileleftsidebar from "../Components/PlayerProfileleftsidebar";
import PlayerProfileCenterBox from "../Components/PlayerProfileCenterBox";
import PlayerProfileRightSidebar from "../Components/PlayerProfileRightSidebar";
import "../styles/font.css"
export default function Playerprofile() {
  return (
    <>
      <div className="flex-col w-full ">
        {/* Page Header */}
        <Header title={"Player's Profile"} />
        <div className="flex  divide-x h-screen">
          {/* left side-bar details  */}
          <div className="w-1/4 ml-10 mr-3 mt-5">
            <PlayerProfileleftsidebar />
          </div>

          {/* center Post */}
          <div className=" w-full mt-7 ">
            <PlayerProfileCenterBox />
          </div>

          {/* right side-bar parent profile */}

          <div className=" mr-5 mt-2 w-4/12">
            <PlayerProfileRightSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
