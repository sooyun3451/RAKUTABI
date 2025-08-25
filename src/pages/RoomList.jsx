import { useState } from 'react';
import {ListItem} from '../components'
import '../css/room_list.css'


export default function RoomList() {
  const [price, setPrice] = useState(100000);
  const [minPrice, setMinPrice] = useState(10000); // 최저가
  const [maxPrice, setMaxPrice] = useState(1000000); // 최고가
  const handleChangePrice = e => setPrice(e.target.value);
  const handleChangeMinPrice = e => setMinPrice(e.target.value);
  const handleChangeMaxPrice = e => setMaxPrice(e.target.value);

  return(    
    <div id='RoomList'>
      <div className='top'>
        <select className="roomOpt">
          <option value="scoreTop">평점 높은 순</option>
          <option value="scoreDown">평점 낮은 순</option>
          <option value="priceTop">높은 가격 순</option>
          <option value="priceDown">낮은 가격 순</option>
        </select>
        <div className='priceRange'>
          <p>1박당 요금</p>
          <div>
            <input 
              type='range'
              min={minPrice} // 최저가
              max={maxPrice} // 최고가
              value={price}
              onChange={handleChangePrice}
              className='priceRangeFilter'
            />
          </div>
          <div className='rangeResult'>
            <input 
              type='text'
              value={minPrice}
              onChange={handleChangeMinPrice}

            />
            <input 
              type='text'
              value={price}
              onChange={handleChangeMaxPrice}
            />
            <button>검색</button>
          </div>
        </div>
      </div>
      <ListItem />
    </div>
  );
}
