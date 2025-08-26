import React from 'react';

import '../css/list_item.css'

export default function ListItem({hotel}) {

  const room1 = hotel.room1
  const room2 = hotel.room2

  return(
    <li className='ListItem'>
      <div className='item'>
        <div className='left'>
          <div className='images'>
            <img src={hotel.img1} />
          </div>
        </div>
        <div className='right'>
          <div className='info'>
            <p>점</p>
            <p>{hotel.hotelName}</p>
            <p>{hotel.city}</p>
            {hotel.totalRoomNumber < 100 &&
              <p>잔여 객실 : {hotel.totalRoomNumber}개</p>
            }
          </div>
          <div className='price'>
            <p>{room1[0].price <= room2[0].price ? room1[0].price : room2[0].price} ~</p>
          </div>
        </div>
      </div>
      <div>
        <button>자세히 보기</button>
      </div>
    </li>
  );
}
