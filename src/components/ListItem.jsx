import { useState } from 'react'

import '../css/list_item.css'

export default function ListItem({hotel}) {

  const room1 = hotel.room1
  const room2 = hotel.room2

  const review1 = hotel.review1
  const review2 = hotel.review2

  const totalScore = 5
  const [starPoint, setStarPoint] = useState((review1[0].score + review2[0].score)/2);


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
            <p className='stars'>  
              {[...Array(totalScore)].map((_, i) => 
                  <span key={i}>
                      {i < starPoint ? '★':''}
                  </span>
              )}
            </p>
            <p className='hotelName'>{hotel.hotelName}</p>
            <p className='hotelCity'><span><img src='/images/ping.png' alt='ping'/></span>{hotel.city}</p>
            {hotel.totalRoomNumber < 100 &&
              <p className='leftRoom'>잔여 객실 : {hotel.totalRoomNumber}개</p>
            }
          </div>
          <div className='price'>
            <p className='roomPrice'>{room1[0].price <= room2[0].price ? room1[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }) : room2[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} ~</p>
            <p>객실당</p>
          </div>
        </div>
      </div>
      <div className='more'>
        <button>자세히 보기</button>
      </div>
    </li>
  );
}
