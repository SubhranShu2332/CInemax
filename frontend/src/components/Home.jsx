import React from 'react'

import Carousals from "./Carousals";
import UpScreening from "./UpScreening";
import PastScreening from "./PastScreening";



const Home = () => {
  return (
    
    <div className='md:px-24 md:pb-10 md:pt-5'>

    <Carousals></Carousals>
    <UpScreening heading={"Upcoming Screenings"}></UpScreening>
    <PastScreening heading={"Past Screenings"}></PastScreening>

    </div>
  )
}

export default Home