import React from "react";
import videoicon from "../assets/videoicon.png";
import DrillCard from "../Components/DrillCard";
import Header from "../Components/Header";
import "../styles/font.css"
export default function UploadingDrill() {
  const staticdata = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];

  // onciick button uppload video

  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };
  return (
    <>
      <div className="flex-col w-full">
        {/* Page Header */}
        <Header title={"Training Drills"}  />

        <div className="flex  divide-x xl:w-full ">
          {/* Upload Of user  */}
          <div>
            <h4 class="self-center font-lexend text-xl font-medium whitespace-nowrap text-white  mt-8 mb-12 ml-8">
              Uploading Drill
            </h4>
            <div className=" flex mx-8 2xl:mr-32 xl:mr-28 font-lexend">
              <div>
                <input
                  type="text"
                  class="bg-[#212121]  text-white xl:text-base 2xl:text-lg text-sm rounded-[4px]  block w-full pl-6 p-2.5 mb-5"
                  placeholder="Enter video title here"
                  required=""
                />

                <textarea
                  rows="10"
                  cols="70"
                  class="block pl-6 p-2.5 w-full xl:text-base  text-sm text-white bg-[#212121] rounded-[4px] placeholder:text-gray-400 "
                  placeholder="Description"
                ></textarea>
              </div>

              <div class="w-[382px] max-h-[350px] ml-5 bg-[#212121] rounded-lg flex flex-col items-center justify-center">
                <div>
                  <img class="mt-10 rounded-t w-8 h-6" src={videoicon} alt="" />
                </div>

                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <div class="p-5 text-center ">
                  <button
                    onClick={handleClick}
                    class=" text-base xl:text-lg font-normal  tracking-tight  text-white"
                  >
                    Upload Video
                  </button>

                  <p class="mb-3 mt-[10px] font-light xl:text-base text-sm  text-gray-400">
                    Mp4,webm formats are supported
                  </p>
                </div>
              </div>
            </div>

            <select
              id="countries"
              class="bg-[#212121]   text-gray-400 xl:text-base text-sm rounded-lg block  pl-6 p-2.5 mx-8 my-5"
            >
              <option  selected=""> Select Category</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <div>
              <button class="inline-flex font-lexend items-center py-2 px-8 ml-8 2xl:py-3 2xl:px-10 text-sm font-normal text-black bg-white rounded-[4px] ">
                Cancel
              </button>
              <button class="inline-flex font-lexend items-center py-2 2xl:py-3 2xl:px-10 px-8 ml-[16px] text-sm font-normal  text-black bg-green-500 rounded-[4px] ">
                Upload
              </button>
            </div>
          </div>

          {/*skill cards */}
          <div className=" xl:w-4/12">
            <h4 class="self-center font-lexend text-xl 2xl:ml-12 font-medium whitespace-nowrap text-white  mt-8 mb-12 ml-8">
              More Drill
            </h4>

            <div className="ml-10 mr-10  2xl:grid 2xl:grid-cols-1 ">
              {staticdata.map((val, ind) => {
                return <DrillCard />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
