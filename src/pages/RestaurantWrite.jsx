import React, { useState } from 'react';
import {FaStar} from "react-icons/fa";
import "../css/restaurant_write.css";

export default function RestaurantWrite() {
  const areaList = [
    { value: "tokyo", name: "도쿄" },
    { value: "osaka", name: "오사카" },
    { value: "sapporo", name: "삿포로" },
    { value: "fukuoka", name: "후쿠오카" },
    { value: "okinawa", name: "오키나와" }
  ];
  const [selected, setSelected] = useState("");
  
  const handleSelect = (e)=>{
    setSelected(e.target.value);
  }

  const [rating, setRating] = useState(0); // 현재 별점 개수 상태
  const totalStars = 5; // 총 별 개수

  return(
    <div id='RestaurantWrite'>
      <div className='title'>
        <div className='left'>
          <div className='restaurantArea'>
            <select onChange={handleSelect} value={selected}>
              {areaList.map((item)=>
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              )}
            </select>
          </div>
          <div className='restaurantName'>
            <input type="text" placeholder='식당이름을 작성해주세요.' />
          </div>
          <div className='rateStar'>
            <p className='star'>
              {[...Array(totalStars)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <FaStar
                    key={starValue}
                    color={starValue <= rating ? '#ffd900' : 'grey'}
                    onClick={() => setRating(starValue)} // 클릭 시 해당 별까지 선택
                    style={{ cursor: 'pointer' }}
                  />
                );
              })}
            </p>
            <p className='selectStar'>별점을 선택해주세요.</p>
          </div>
        </div>
        <div className='right'>
          <div className='location'>
            <p><img src="../../public/images/icon_location3.png" alt="location" /></p>
            <p><input type="text" placeholder='위치를 작성해주세요.' /></p>
          </div>
        </div>
      </div>
      <div className='review'>
        <div className='content'><input type="text" placeholder='내용을 작성해주세요.' /></div>
        <div className='function'>
          <div className='addfile'>
            <p><input type="text" placeholder='300MB 이하의 파일만 추가할 수 있습니다.' /></p>
            <p><button className='addPhoto'>사진 첨부하기</button></p>
          </div>
          <div className='writeBtn'>
            <p><button className='writeDone'>작성 완료</button></p>
            <p><button className='writeCancle'>작성 취소</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}