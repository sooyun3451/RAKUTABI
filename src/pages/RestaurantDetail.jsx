import React, { useEffect, useState } from 'react';
import "../css/restaurant_detail.css"
import axios from 'axios';

export default function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState({photo: []});
  const fetchData = async () => {
    const response = await axios.get('/data/restaurantDetail.json');
    setRestaurant(response.data[0]);
  }

  useEffect(() => {
    fetchData();
  },[]);

  return(
    <div id='restaurantDetail'>
      <div className='title'>
        <div className='left'>
          <div className='restaurantName'>{restaurant.name}</div>
          <div>
            <p className='star'>{restaurant.star}</p>
            <p>{restaurant.rate}</p>
          </div>
        </div>
        <div className='right'>
          <div className='location'>
            <p><img src="../../public/images/icon_location3.png" alt="location" /></p>
            <p>{restaurant.location}</p>
          </div>
          <div><button className='favorite'><img src="../../public/images/icon_favorite_checked.png" alt="favorite" /></button></div>
        </div>
      </div>
      <div className='photo'>
        <ul>
          <li className='mainPhoto'><img src={restaurant.photo[0]} alt="mainPhoto" /></li>
          <li className='subPhoto'>
            <p className='subPhoto1'><img src={restaurant.photo[1]} alt="subPhoto1" /></p>
            <p className='subPhoto2'><img src={restaurant.photo[2]} alt="subPhoto2" /></p>
          </li>
          {/* {
            restaurant.photo && (
              restaurant.photo.map((photo, i) => 
                <li key={i}><img src={photo} alt="photo" /></li>
              )
            )
          } */}
          <li><button>+</button></li>
        </ul>
      </div>
      <div className='review'>
        <div className='writer'>
          <div className='user'>
            <p className='profile'><img src={restaurant.profile} alt="profile" /></p>
            <p>{restaurant.nickname}</p>
          </div>
          <p>{restaurant.date}</p>
        </div>
        <div className='content'>{restaurant.content}</div>
      </div>
    </div>
  )
}