import React from 'react'
import ScreeningCard from './ScreeningCard'
import screen_1 from "../assets/screen_card_pic4.png";
import screen_2 from "../assets/screen_card_pic5.png";
import screen_3 from "../assets/screen_card_pic6.png";
import {Link} from "react-router-dom"

const PastScreening = (props) => {
  return (
    < >
       <div className='mb-4'>
       <div className='mt-3 text-xl md:text-2xl md:my-5 mx-3 font-semibold'>
            {props.heading}
        </div>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-3 mx-3">
        <Link to={`screening/tt10698680`}><ScreeningCard pic={screen_1} m_name={"K.G.F Chapter-2"} m_rating={"9.2/10"} votes={"200K"}></ScreeningCard></Link>
        
        <Link to={`screening/tt13818368`}>    <ScreeningCard pic={screen_2} m_name={"Fighter"} m_rating={" 9.2/10"} votes={"200K"}></ScreeningCard></Link>
        <Link to={`screening/tt7430722`}>  <ScreeningCard pic={screen_3} m_name={"War"} m_rating={" 9.2/10"} votes={"200K"}></ScreeningCard></Link>
        </div>
       </div>
    </>
  )
}

export default PastScreening