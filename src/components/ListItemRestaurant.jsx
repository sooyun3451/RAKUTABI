import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../css/list_item_restaurant.css'



export default function ListItemRestaurant({restaurant}) {
    const navigate = useNavigate();

    const imgData = [
        {id : 1, img : restaurant.photo[0]},
        {id : 2, img : restaurant.photo[1]},
        {id : 3, img : restaurant.photo[2]},
    ];
    
    // 이미지 슬라이드 인덱스
    const [slideIndex, setSlideIndex] = useState(1);
    
    // 좋아요 상태변수, 핸들러
    const [liked, setLiked] = useState(false);
    const handleClickHeart = () => {
        setLiked(prev => !prev);
    }

    const moveToPrevSlide = () => {
        if(slideIndex !== 1) {
            setSlideIndex(prev => prev - 1);
        } else {
            setSlideIndex(imgData.length)
        }
    }

    const moveToNextSlide = () => {
        if(slideIndex !== imgData.length) {
            setSlideIndex(prev => prev + 1);
        } else {
            setSlideIndex(1)
        }
    }


    return(
        <li className="ListItemRestaurant">
            <Link to={`/restaurant/detail/${restaurant.id - 1}`}>
                <div className="item">
                    <div className="left">
                        {imgData.map((data) =>
                            <div
                                key={data.id}
                                className={data.id === slideIndex ? "images active" : "images"}
                            >
                                <button 
                                    className='btnPrev' 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        moveToPrevSlide();
                                    }}
                                >
                                    <img src='/images/icon_prev.png' alt='이전' />
                                </button>
                                <img src={data.img} />
                                <button 
                                    className='btnNext'  
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        moveToNextSlide();
                                    }}
                                >
                                    <img src='/images/icon_next.png' alt='다음' />
                                </button>
                                <p className='heart'>
                                    <button 
                                        onClick={e => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleClickHeart();
                                        }}
                                    >
                                        <img 
                                            src={liked ?
                                                '/images/icon_favorite_checked_pink.png' :
                                                '/images/icon_favorite_unchecked_white.png'} 
                                            alt='좋아요'
                                        />
                                    </button>
                                </p>
                            </div>
                            )
                        }    
                    </div>
                    <div className="right">
                        <div className="info">
                            <p className="stars">
                                {restaurant.star}
                                <span>{restaurant.rate}</span>
                            </p>
                            <div className='nameAndLocation'>
                                <p className="restaurantName">{restaurant.name}</p>
                                <div className="restaurantLocation">
                                    <p className='ping'><img src='/images/icon_location3.png'/></p>
                                    <p>{`${restaurant.area}, ${restaurant.location}`}</p>
                                </div>
                            </div>
                            <p className="restaurantReview">{restaurant.content}</p>
                        </div>
                        <div className="userAndDate">
                            <div className="user">
                                <p className='profile'><img src={restaurant.profile}/></p>
                                <p className='nickname'>{restaurant.nickname}</p>
                            </div>
                            <p className="date">{restaurant.date}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    );
}