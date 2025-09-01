import { useState, useEffect } from "react";
import axios from "axios";

import '../css/restaurant_region.css';

const SORT_OPTION_LIST = [
  {value : 'new', name :'최신 순'},
  {value : 'scoreTop', name :'별점 높은 순'}
];

export default function RestaurantRegion() {
  const [restaurants, setRestaurants] = useState([]);

  const [currentSort, setCurrentSort] = useState(SORT_OPTION_LIST[0].value);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('/data/restaurantDetail.json');
      setRestaurants(res.data);
    } catch (e) {
      console.error('데이터 로딩 에러', e);
    }
  }

  const getFilterChange = () => {
    
    let sortedRestaurants = [];
      if(currentSort === 'new') {
        sortedRestaurants = restaurants.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (currentSort === 'scoreTop') {
      sortedRestaurants = restaurants.sort((a, b) => a.rate - b.rate);
      };
      return sortedRestaurants;
  }

  const filterSortList = getFilterChange();

  return (
    <div>
      <div className="top">
        <p className="area">도쿄</p>
        <div className="filterWrap">
          <select
            value={currentSort}
          >
            {/* {SORT_OPTION_LIST.map()} */}
          </select>
        </div>
      </div>
      <div className="botton">
        {restaurants.map(
          restaurant => restaurant.name
        )}
      </div>
    </div>
  );
}
