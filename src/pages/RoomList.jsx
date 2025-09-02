import { useState, useEffect } from 'react';
import {ListItem} from '../components';
import '../css/room_list.css';
import axios from 'axios';


const SORT_OPTION_LIST = [
  {value : 'recommend', name :'추천 순'},
  {value : 'scoreTop', name :'평점 높은 순'},
  {value : 'scoreDown', name :'평점 낮은 순'},
  {value : 'priceTop', name :'높은 가격 순'},
  {value : 'priceDown', name :'낮은 가격 순'}
];



export default function RoomList() {
  const [isReday, setIsReady] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelData, setHotelData] = useState([]);

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
  
  const [price, setPrice] = useState(maxRoomPrice);
  const [minPrice, setMinPrice] = useState(minRoomPrice); // 최저가
  const [maxPrice, setMaxPrice] = useState(maxRoomPrice); // 최고가
  const handleChangeCurrentSort = e => setCurrentSort(e.target.value);
  const handleChangePrice = e => setPrice(Number(e.target.value));
  
  
  const handleChangeMinPrice = e => setMinPrice(e.target.value);
  const handleChangeMaxPrice = e => setMaxPrice(e.target.value);
  
  const handleChangeMinPriceInput = e => {
    const value = e.target.value.replace(/[₩,]/g, '');
    const num = Number(value);
    if(!isNaN(num)) setMinPrice(num);
  };
  const handleChangePriceInput = e => {
    const value = e.target.value.replace(/[₩,]/g, '');
    const num = Number(value);
    if(!isNaN(num)) setPrice(num);
  };


  useEffect(() => {
    fetchData()
  }, []);

  // 데이터 로드 함수
  const fetchData = async () => {
    try{
      const res = await axios.get('/data/room.json');
      setHotels(res.data);
    }catch(e){
      console.error('데이터 로딩 에러', e);
    } finally {
      setIsReady(true);
    }
  }


  // 필터!!!!!!!!!!!!!!!!!!
  const getFilterChange = () => {
    
    const hotelsWithAvgScoreAndMinPrice = hotels.map(hotel => ({
      ...hotel,
      avgScore : (
        Number(hotel.review1[0].score) +
        Number(hotel.review2[0].score)
      ) /2,
      minRoomPrice: Math.min(
        Number(hotel.room1[0].price),
        Number(hotel.room2[0].price)
      ), 
    }));

    let sortedHotels = [];
      if(currentSort === 'scoreTop') {
        sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => b.avgScore - a.avgScore);
      } else if (currentSort === 'scoreDown') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => a.avgScore - b.avgScore);
      } else if (currentSort === 'priceTop') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => b.minRoomPrice - a.minRoomPrice);
      } else if (currentSort === 'priceDown') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => a.minRoomPrice - b.minRoomPrice);
      } else {
      sortedHotels = hotelsWithAvgScoreAndMinPrice;
      };
      return sortedHotels;
  }
    
  const filterSortList = getFilterChange();
  
  // filterSortList에서 minRoomPrice와 maxRoomPrice 구하기
  const filteredPrices = filterSortList.map(hotel => hotel.minRoomPrice);
  const dynamicMinPrice = filteredPrices.length > 0 ? Math.min(...filteredPrices) : minRoomPrice;
  const dynamicMaxPrice = filteredPrices.length > 0 ? Math.max(...filteredPrices) : maxRoomPrice;

  useEffect(() => {
  setMinPrice(dynamicMinPrice);
  setMaxPrice(dynamicMaxPrice);
  }, [dynamicMinPrice, dynamicMaxPrice]);

  // 1박당 요금 슬라이더
  const handlePrice = () => {
      
    // const filtered = hotels.filter(
    //   hotel =>
    //     Number(hotel.room1[0].price) <= price ||
    //     Number(hotel.room2[0].price) <= price
    // );
    // setHotelData(filtered);

    // 정렬된 리스트에서 슬라이더 조건으로 필터링
    const filtered = filterSortList.filter(
    hotel => hotel.minRoomPrice <= price
    );
    setHotelData(filtered);
  };

  useEffect(() => {
  // hotels 데이터가 바뀔 때마다 price를 최대값으로 초기화
  setPrice(maxRoomPrice);
  }, [maxRoomPrice]);

  useEffect(() => {
  if (hotelData.length > 0) {
    const hotelsWithAvgScoreAndMinPrice = hotelData.map(hotel => ({
      ...hotel,
      avgScore: (
        Number(hotel.review1[0].score) +
        Number(hotel.review2[0].score)
      ) / 2,
      minRoomPrice: Math.min(
        Number(hotel.room1[0].price),
        Number(hotel.room2[0].price)
      ),
    }));

    let sortedHotels = [];
    if (currentSort === 'scoreTop') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => b.avgScore - a.avgScore);
    } else if (currentSort === 'scoreDown') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => a.avgScore - b.avgScore);
    } else if (currentSort === 'priceTop') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => b.minRoomPrice - a.minRoomPrice);
    } else if (currentSort === 'priceDown') {
      sortedHotels = hotelsWithAvgScoreAndMinPrice.sort((a, b) => a.minRoomPrice - b.minRoomPrice);
    } else {
      sortedHotels = [...hotelData];
    }
    setHotelData(sortedHotels);
  }
  }, [currentSort]);


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
              min={minPrice} // 최저가
              max={maxRoomPrice} // 최고가
              value={price}
              onChange={handleChangePrice}
              className='priceRangeFilter'
            />
          </div>
          <div className='rangeResult'>
            <input 
              type='text'
              value={`₩${minPrice.toLocaleString()}`}
              // value={minPrice}
              onChange={handleChangeMinPriceInput}
              className='priceRangeFilterInput'
            />
            <input 
              type='text'
              // value={'₩' + `${price}`}
              value={`₩${price.toLocaleString()}`}
              onChange={handleChangePriceInput}
              className='priceRangeFilterInput'
            />
            <button onClick={handlePrice}>검색</button>
          </div>
        </div>
      </div>
      <div className='bottom'>
        <p className='total'>총 {hotelData.length > 0 ? hotelData.length : filterSortList.length}건</p>
        <div>
          {/* {filterSortList.map(hotel => <ListItem key={hotel.hotelId} hotel={hotel} />)} */}
          {hotelData.length > 0
            ? hotelData.map(hotel => <ListItem key={hotel.hotelId} hotel={hotel} />)
            : filterSortList.map(hotel => <ListItem key={hotel.hotelId} hotel={hotel} />)
          }
        </div>
      </div>
    </div>
  );
}