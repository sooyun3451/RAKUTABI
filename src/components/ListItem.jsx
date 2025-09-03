import { useState } from 'react'
import { Link } from 'react-router-dom'

import '../css/list_item.css'

export default function ListItem({hotel}) {

  // 객실
  const room1 = hotel.room1
  const room2 = hotel.room2

  // 리뷰
  const review1 = hotel.review1
  const review2 = hotel.review2

  // 편의시설
  const convenientFacilities = hotel.convenientFacilities


  // 별점 관리 상태변수
  const totalScore = 5
  const [starPoint, setStarPoint] = useState((review1[0].score + review2[0].score)/2);

  // 좋아요 상태변수, 핸들러
  const [liked, setLiked] = useState(false);
  const handleClickHeart = (e) => {
    e.preventDefault();
    setLiked(prev => !prev);
  }

  return(
    <li className='ListItem'>
      <Link to={`/room/detail/${hotel.hotelId}`}>
        <div className='item'>
          <div className='left'>
            <div className='images'>
              <img src={hotel.img1} />
            </div>
            <p className='heart'>
              <button onClick={handleClickHeart}>
                <img 
                  src={liked ? 
                  '/images/likebutton_liked.png' : 
                  '/images/likebutton_unliked.png'} alt='좋아요'
                >
                </img>
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
              <div className='facilityList'>
                {convenientFacilities[0].parking && (
                  <p className='facilCheck'>
                    <img src='/images/checkmark.png'/>
                    <span>주차 가능</span>
                  </p>
                )}
                {convenientFacilities[0].sauna && (
                  <p className='facilCheck'>
                    <img src='/images/checkmark.png'/>
                    <span>사우나 있음</span>
                  </p>
                )}
                {convenientFacilities[0].pool &&(
                  <p className='facilCheck'>
                    <img src='/images/checkmark.png'/>
                    <span>수영장 있음</span>
                  </p>
                )}
              </div>
              <p className='hotelCity'><span><img src='/images/ping.png' alt='ping'/></span>{hotel.city}</p>
              {hotel.totalRoomNumber < 3 && hotel.totalRoomNumber >= 1 &&
                <p className='leftRoom'>잔여 객실 단 {hotel.totalRoomNumber}개</p>
              }
            </div>
            <div className='price'>
              <p className='roomPrice'>
                {room1[0].price <= room2[0].price ? 
                room1[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' }) : 
                room2[0].price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} ~
              </p>
              <p>객실당</p>
              <p>숙박 인원 {room1[0].price <= room2[0].price ? room1[0].maxCapa : room2[0].maxCapa }명 1박</p>
            </div>
          </div>
        </div>
        <div className='more'>
          {hotel.totalRoomNumber == 0 ?
            <button className='noRoom'>객실 판매 완료</button> : 
            <button><Link to={`/room/detail/${hotel.hotelId}`}>자세히 보기</Link></button>
          }
        </div>
      </Link>
    </li>
  );
}
