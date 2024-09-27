import React from 'react'
import ScreeningCard from './ScreeningCard'
import screen_1 from "../assets/screen_card_pic.jpg";
import screen_2 from "../assets/screen_card_pic2.jpg";
import screen_3 from "../assets/screen_card_pic3.png";
import { Link } from 'react-router-dom';
import Screening from './Screening';

const UpScreening = (props) => {
  return (
    < >
        <div className='mt-3 text-xl md:text-2xl md:my-5 mx-3 font-semibold'>
            {props.heading}
        </div>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-3 mx-3">
            <Link to={`screening/tt27510174`}><ScreeningCard pic={screen_1} m_name={"Stree 2: Sarkate Ka Atank"} m_rating={" 9.2/10 "} votes={"200K"}></ScreeningCard></Link>
            <Link to={`screening/tt12735488`}><ScreeningCard pic={screen_2} m_name={"Kalki: 2898 AD"} m_rating={" 8.7/10 "} votes={"400K"}></ScreeningCard></Link>
            <Link to={`screening/tt26548265`}><ScreeningCard pic={screen_3} m_name={"Maharaja"} m_rating={" 8.9/10"} votes={"50K"}></ScreeningCard></Link>
        </div>
    </>
  )
}

export default UpScreening