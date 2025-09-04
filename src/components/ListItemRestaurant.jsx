import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/list_item_restaurant.css'



export default function ListItemRestaurant({restaurant}) {

    // 이미지 슬라이드 인덱스
    const [slideIndex, setSlideIndex] = useState(0);
    
    // 좋아요 상태변수, 핸들러
    const [liked, setLiked] = useState(false);
    const handleClickHeart = (e) => {
        e.preventDefault();
        setLiked(prev => !prev);
    }

    const imgData = [
        {id : 0, img : restaurant.photo[0]},
        {id : 1, img : restaurant.photo[1]},
        {id : 2, img : restaurant.photo[2]},
        {id : 3, img : restaurant.photo[3]},
    ];

    return(
        <li className="ListItemRestaurant">
            <Link to={`/restaurant/detail/${restaurant.id - 1}`}>
                <div className="item">
                    <button className='prev'>이전</button>
                    <div className="left">
                        {imgData.map((data) =>
                            <div 
                                key={data.id} 
                                className={data.id === slideIndex ? "images active" : "images" }
                            >
                                    <img src={data.img} />
                                </div>
                            )
                        }
                        <p className='heart'>
                            <button onClick={handleClickHeart}>
                                <img 
                                    src={liked ?
                                        '/images/icon_favorite_checked.png' :
                                        '/images/icon_favorite_unchecked.png'} 
                                    alt='좋아요'
                                >
                                </img>
                            </button>
                        </p>
                    </div>
                    <button className='next'>다음</button>
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