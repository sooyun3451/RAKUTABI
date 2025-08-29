import React, { useEffect, useState } from 'react';
import "../css/restaurant_detail.css"
import axios from 'axios';
import Modal from 'react-modal';

export default function RestaurantDetail() {
  const [restaurant, setRestaurant] = useState({photo: []});
  const fetchData = async () => {
    const response = await axios.get('/data/restaurantDetail.json');
    setRestaurant(response.data[14]);
  }  
  useEffect(() => {
    fetchData();
  },[]);
  
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClickFavorite = ()=>{
    setIsFavorite(!isFavorite);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modal = () => {
    setIsModalOpen(!isModalOpen);
    if(!isModalOpen){
      setCurrentPhotoIndex(0);
    }
  }

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const handlePrevClick = ()=>{
    setCurrentPhotoIndex((prevIndex) =>
      (prevIndex - 1 + restaurant.photo.length) % restaurant.photo.length);
  }
  const handleNextClick = ()=>{
    setCurrentPhotoIndex((prevIndex) =>
      (prevIndex + 1) % restaurant.photo.length);
  }

  return(
    <div id='restaurantDetail'>
      <div className='title'>
        <div className='left'>
          <div className='restaurantArea'>{restaurant.area}</div>
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
          <div>
            <button className='favorite' onClick={handleClickFavorite}>
              <img src={
                isFavorite
                  ?"../../public/images/icon_favorite_checked.png"
                  : "../../public/images/icon_favorite_unchecked.png"
                } alt="favorite" />
            </button>
          </div>
        </div>
      </div>
      <div className='photo'>
        <ul>
          <li className='mainPhoto'><img src={restaurant.photo[0]} alt="mainPhoto" /></li>
          <li className='subPhoto'>
            <p className='subPhoto1'><img src={restaurant.photo[1]} alt="subPhoto1" /></p>
            <p className='subPhoto2'><img src={restaurant.photo[2]} alt="subPhoto2" /></p>
          </li>
          <li className='openPhoto'>
            <button onClick={modal}>+ 더보기</button>
            { isModalOpen && (
              <Modal isOpen={isModalOpen} onRequestClose={modal} >
                <li className='sliderWrap'>
                  <div className='sliderPhoto'>
                    <div className='sliderInner'>
                      {restaurant.photo && restaurant.photo.length > 0 && (
                        <div className='slider'>
                          <img src={restaurant.photo[currentPhotoIndex]} alt="photo" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='sliderBtn'>
                    <button onClick={handlePrevClick} className='prev' title='이전 사진'>prev</button>
                    <button onClick={handleNextClick} className='next' title='다음 사진'>next</button>
                  </div>
                </li>  
                <button onClick={modal}>닫기</button>
              </Modal>
            )}
          </li>
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