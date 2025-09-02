import { Link } from 'react-router-dom';

import '../css/list_item_restaurant.css'

export default function ListItemRestaurant({restaurant}) {
    
    return(
        <li className="ListItemRestaurant">
            <Link to={`/restaurant/detail/${restaurant.id - 1}`}>
                <div className="item">
                    <div className="left">
                        <div className="images">
                            <img src={restaurant.photo[0]} />
                        </div>
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