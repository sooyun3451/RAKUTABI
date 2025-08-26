import React from 'react';

import '../css/list_item.css'

export default function ListItem({hotel}) {

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
