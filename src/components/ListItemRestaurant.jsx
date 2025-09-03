import { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/list_item_restaurant.css'

export default function ListItemRestaurant({restaurant}) {
    
    // 좋아요 상태변수, 핸들러
    const [liked, setLiked] = useState(false);
    const handleClickHeart = (e) => {
        e.preventDefault();
        setLiked(prev => !prev);
    }

    return(
        <li className="ListItemRestaurant">
            <Link to={`/restaurant/detail/${restaurant.id - 1}`}>
                <div className="item">
                    <div className="left">
                        <div className="images">
                            <img src={restaurant.photo[0]} />
                        </div>
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