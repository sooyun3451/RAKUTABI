import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../css/list_item.css'

export default function ListItem({hotel}) {

  const room1 = hotel.room1
  const room2 = hotel.room2

  const review1 = hotel.review1
  const review2 = hotel.review2

  const totalScore = 5
  const [starPoint, setStarPoint] = useState((review1[0].score + review2[0].score)/2);

  // const handleClickHeart = () => {

  // }

  return(
    <li className='ListItem'>
      <div className='item'>
        <div className='left'>
          <div className='images'>
            <img src={hotel.img1} />
          </div>
          <p className='heart'>
            <button>
              <img src='/images/likebutton_unliked.png'></img>
            </button>
          </p>
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
            {(room1[0].smoking === false || room2[0].smoking === false) &&
              <p className='nonSmoking'>금연 객실 있음</p>
            }
            {(room1[0].breakfast === true || room2[0].breakfast === true) &&
              <p className='breakfast'>조식 제공</p>
            }
            <p className='hotelCity'><span><img src='/images/ping.png' alt='ping'/></span>{hotel.city}</p>
            {hotel.totalRoomNumber < 3 && hotel.totalRoomNumber >= 1 &&
              <p className='leftRoom'>잔여 객실 단 {hotel.totalRoomNumber}개</p>
            }
          </div>
          <div className='price'>
            <p className='roomPrice'>{room1[0].price <= room2[0].price ? room1[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }) : room2[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} ~</p>
            <p>객실당</p>
            <p>숙박 인원 {room1[0].price <= room2[0].price ? room1[0].maxCapa : room2[0].maxCapa }명 1박</p>
          </div>
        </div>
      </div>
      <div className='more'>
        {/* <button>자세히 보기</button> */}
        {hotel.totalRoomNumber == 0 ?<button className='noRoom'>객실 판매 완료</button> : <button><Link to={`/room/detail/${hotel.hotelId}`}>자세히 보기</Link></button>}
      </div>
    </li>
  );
}
