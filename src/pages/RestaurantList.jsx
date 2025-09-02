import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/restaurant_list.css';

export default function RestaurantList() {

  const [restaurants, setRestaurants] = useState([]);

  const fetchData = async () => {
    const response = await axios.get('/data/restaurantDetail.json');
    const data = response.data;

    const groupedData = data.reduce((acc, item) => {
      const groupKey = item.area;
      if(!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push({...item, favo: false});
      return acc;
    }, {});
    
    const groupedArray = Object.entries(groupedData).map(([area, item]) => ({
      area,item
    }));
    setRestaurants(groupedArray);
  }

const toggleFavo = (area, id) => {
  setRestaurants(prev =>
    prev.map(group => {
      if (group.area !== area) return group; 
      return {
        ...group,
        item: group.item.map(r =>
          r.id === id ? { ...r, favo: !r.favo } : r
        )
      };
    })
  );
};


  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className='restaurant-wrapper'>
      <h1 className='restaurant-title'>식당</h1>
      {
        restaurants.map(group => (
          <div key={group.area} className='area-list'>
            <div className='area-div'>
            <h2>{group.area}</h2>
            <button>더 보기</button>
            </div>
            <ul>
              {
                group.item.slice(0,4).map((restaurant) => (
                  <li key={restaurant.id} className='restaurant-card'>
                    <Link to={`/restaurant/detail/${restaurant.id - 1}`}>
                    <div className='img-wrapper'>
                      <img src={restaurant.photo[0]} alt={restaurant.name} />
                    </div>
                    <p className='star'>{restaurant.star}</p>
                    <p className='name'>{restaurant.name}</p>
                    </Link>
                      <p className='favo'><button onClick={() => toggleFavo(group.area,restaurant.id)}><img src={restaurant.favo ? '/public/images/icon_favorite_checked.png' : '/public/images/icon_favorite_unchecked.png'} /></button></p>
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  )
}
