import React from 'react';

import '../css/list_item.css'

export default function ListItem({hotel}) {

  const room1 = hotel.room1
  const room2 = hotel.room1
  const room3 = hotel.room1
  console.log(room1)

  // console.log(room1.price)

  return(
    <li className='ListItem'>
      <div>
        <p className='images'><img src={hotel.img1} /></p>
      </div>
      <div>
        <p>{hotel.hotelName}</p>
        <p>{hotel.city}</p>
      </div>
    </li>
  );
}
