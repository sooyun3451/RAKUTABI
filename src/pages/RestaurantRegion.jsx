import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import '../css/restaurant_region.css';
import ListItemRestaurant from "../components/ListItemRestaurant";

const SORT_OPTION_LIST = [
  {value : 'new', name :'최신 순'},
  {value : 'scoreTop', name :'별점 높은 순'}
];

export default function RestaurantRegion() {
  const [restaurants, setRestaurants] = useState([]);

  const [currentSort, setCurrentSort] = useState(SORT_OPTION_LIST[0].value);
  const handleChangeCurrentSort = e => setCurrentSort(e.target.value);
  
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
      sortedRestaurants = restaurants.sort((a, b) => b.rate - a.rate);
      };
      return sortedRestaurants;
  }

  const filterSortList = getFilterChange();

  return (
    <div id="RestaurantRegion">
      <div className="top">
        <p className="area">도쿄</p>
        <div className="filterWrap">
          <select
            value={currentSort}
            onChange={handleChangeCurrentSort}
          >
            {SORT_OPTION_LIST.map((opt, idx) => 
              <option key={idx} value={opt.value}>{opt.name}</option>
            )}
          </select>
        </div>
      </div>
      <div className="botton">
        <div>
          {restaurants.map(
            restaurant => <ListItemRestaurant key={restaurant.id} restaurant={restaurant}/>
          )}
        </div>  
      </div>
      <div className="review">
        <button><Link to='/restaurant/write'>리뷰 작성</Link></button>
      </div>
    </div>
  );
}
