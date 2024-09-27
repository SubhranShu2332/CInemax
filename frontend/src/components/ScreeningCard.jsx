import React from 'react'
import { FaStar } from "react-icons/fa";


const ScreeningCard = (props) => {
  return (
    <>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-3 ">

        <a href="#">
          <img className="rounded-t-lg h-36 md:h-60 w-full" src={props.pic} alt="" />
        </a>
        <div className='flex bg-black px-1 py-1 text-white text-xs font-medium justify-evenly md:text-lg md:justify-streach'>

          <div className='flex'>
            <FaStar className=" text-sm md:text-lg md:inline-block md:mt-1" style={{ color: "#D70040" }} />
            {props.m_rating}
          </div>

          <div>
            {props.votes}
            <span className='hidden md:inline'> Votes</span>
          </div>

          {/* </span> */}

        </div>
        <div className="p-1 text-center text-sm md:text-base">
          {props.m_name}
        </div>

      </div>

    </>
  )
}

export default ScreeningCard