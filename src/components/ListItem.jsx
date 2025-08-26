import React from 'react';

import '../css/list_item.css'

export default function ListItem({hotel}) {

  return(
    <li className='ListItem'>
      <p>{hotel.hotelName}</p>
      <p>{hotel.city}</p>
      <p className='images'><img src={hotel.img1} /></p>
      <p className='images'><img src={hotel.img2} /></p>
      <p className='images'><img src={hotel.img3} /></p>
    </li>
  );
}
