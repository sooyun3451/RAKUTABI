import { useState, useEffect } from 'react';
import {ListItem} from '../components';
import '../css/room_list.css';
import axios from 'axios';


const SORT_OPTION_LIST = [
  {value : 'scoreTop', name :'평점 높은 순'},
  {value : 'scoreDown', name :'평점 낮은 순'},
  {value : 'priceTop', name :'높은 가격 순'},
  {value : 'priceDown', name :'낮은 가격 순'}
];



export default function RoomList() {
  const [isReday, setIsReady] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelData, setHotelData] = useState(hotels);

  const mapfn = (arg) => Number(arg);
  const room1Price = hotels.map(hotel => hotel.room1[0].price);
  const r1 = String(room1Price);
  const r1P = r1.split(',').map(mapfn);
  const room2Price = hotels.map(hotel => hotel.room2[0].price);
  const r2 = String(room2Price);
  const r2P = r2.split(',').map(mapfn);
  const roomPrice = r1P.concat(r2P);

  //hotels에서 room1 room2 가격의 최대값 찾기
  const maxRoomPrice = Math.max(...roomPrice);

  //hotels에서 room1 room2 가격의 최소값 찾기
  const minRoomPrice = Math.min(...roomPrice);

  const [currentSort, setCurrentSort] = useState(SORT_OPTION_LIST[0].value);
  
  const [price, setPrice] = useState();
  const [minPrice, setMinPrice] = useState(minRoomPrice); // 최저가
  const [maxPrice, setMaxPrice] = useState(maxRoomPrice); // 최고가
  const handleChangeCurrentSort = e => setCurrentSort(e.target.value);
  const handleChangePrice = e => setPrice(e.target.value);
  
  
  const handleChangeMinPrice = e => setMinPrice(e.target.value);
  const handleChangeMaxPrice = e => setMaxPrice(e.target.value);



  useEffect(() => {
    fetchData()
  }, []);

  // 데이터 로드 함수
  const fetchData = async () => {
    try{
      const res = await axios.get('/data/room.json');
      setHotels(res.data);
    }catch(e){
      console.error(e);
    } finally {
      setIsReady(true);
    }
  }

  
  

  // 필터!!!!!!!!!!!!!!!!!!
  const getFilterChange = () => {
    const data = hotels;
    const sortList = data.sort((a, b) => {
        if(currentSort === 'scoreTop') {
          return ;
        } else if(currentSort === 'scoreDown') {
          return ;
        } else if(currentSort === 'priceTop') {
          return ;
        } else if(currentSort === 'priceDown') {
          return ;
        }
    });
    return sortList
  }
  const filterSortList = getFilterChange();

  
  // 1박당 요금 슬라이더
  const handlePrice = () => {
    // const aa = hotels.filter(hotel => hotel.room1[0].price <= maxRoomPrice && hotel.room2[0].price <= maxRoomPrice);
    const aa = hotels.filter(hotel => hotel.room1[0].price <= price && hotel.room2[0].price <= price);
    setHotelData(aa);
    setHotels(aa);
  }


  return(    
    <div id='RoomList'>
      <div className='top'>
        <select 
          className="roomOpt"
          value={currentSort}
          onChange={handleChangeCurrentSort}
        >
          {SORT_OPTION_LIST.map((opt, idx) => 
            <option key={idx} value={opt.value}>{opt.name}</option>
          )}
        </select>
        <div className='priceRange'>
          <p>1박당 요금</p>
          <div>
            <input 
              type='range'
              min={minRoomPrice} // 최저가
              max={maxRoomPrice} // 최고가
              value={price}
              onChange={handleChangePrice}
              className='priceRangeFilter'
            />
          </div>
          <div className='rangeResult'>
            <input 
              type='text'
              value={minRoomPrice}
              onChange={handleChangeMinPrice}

            />
            <input 
              type='text'
              value={price}
              onChange={handleChangeMaxPrice}
            />
            <button onClick={handlePrice}>검색</button>
          </div>
        </div>
      </div>
      <div className='bottom'>
        <p className='total'>총 {hotels.length}건</p>
        <div>
          {hotels.map(hotel => <ListItem key={hotel.hotelId} hotel={hotel} />)}
        </div>
      </div>
    </div>
  );
}
