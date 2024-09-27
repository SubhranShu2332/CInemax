import React from 'react'
import slider_img_1 from "../assets/slide_image_1.jpg";
import slider_img_2 from "../assets/slide_image_2.png";
import slider_img_3 from "../assets/slide_image_3.png";
import slider_img_4 from "../assets/slide_image_5.jpg";
import slider_img_5 from "../assets/slide_image_1.png";
// import s_1 from "../assets/s"frontend\src\assets\slider_img_1.png
import { Carousel } from "flowbite-react";
 function Carousals() {
    return (
    <div>
        <div className="h-48 md:h-[28rem] px-2 my-2">
      <Carousel>
        <img src={slider_img_1} alt="..." className='h-full' />
        <img src={slider_img_2} alt="..." className='h-full' />
        <img src={slider_img_3} alt="..." className='h-full' />
        <img src={slider_img_4} alt="..." className='h-full' />
        <img src={slider_img_5} alt="..." className='h-full' />
      </Carousel>
    </div>
  
           

    </div>



    )
}

export default Carousals