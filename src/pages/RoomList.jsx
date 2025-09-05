import { useState, useEffect, useRef } from "react";
import { ListItem } from '../components';
import { useSearchParams } from 'react-router-dom';
import '../css/room_list.css';
import axios from 'axios';

const SORT_OPTION_LIST = [
  { value: 'recommend', name: '추천 순' },
  { value: 'scoreTop', name: '평점 높은 순' },
  { value: 'scoreDown', name: '평점 낮은 순' },
  { value: 'priceTop', name: '높은 가격 순' },
  { value: 'priceDown', name: '낮은 가격 순' }
];

export default function RoomList() {
  const [isReady, setIsReady] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [searchParams] = useSearchParams();

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
    fetchData();
  }, []);
  // 데이터 로딩
  const fetchData = async () => {
    try {
      const res = await axios.get('/data/room.json');
      setHotels(res.data);
      setHotelData(res.data);
    } catch (e) {
      console.error('데이터 로딩 에러', e);
    } finally {
      setIsReady(true);
    }
  };
  

  const getFilterChange = () => {
    const query = searchParams.get('query');
    const roomCountParam = searchParams.get('roomCount');
    const capacityParam = searchParams.get('capacity');
    let filteredHotels = [...hotels];

    // 1. 검색어 필터링
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      filteredHotels = filteredHotels.filter(hotel =>
        hotel.hotelName.toLowerCase().includes(lowerCaseQuery) ||
        hotel.address.toLowerCase().includes(lowerCaseQuery) ||
        hotel.city.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // 2. 객실 수 필터링
    if (roomCountParam && roomCountParam !== '1') {
      const selectedRoomCount = Number(roomCountParam);
      filteredHotels = filteredHotels.filter(hotel => {
        const totalRooms = hotel.room1.length + hotel.room2.length;
        if (selectedRoomCount === 1) return true; // 1개 선택 시 모든 호텔 표시
        if (selectedRoomCount === 2) return totalRooms >= 2;
        if (selectedRoomCount === 3) return totalRooms >= 3;
        return true;
      });
    }

    // 3. 인원수 필터링
    if (capacityParam && capacityParam !== '1') {
      const selectedCapacity = Number(capacityParam);
      filteredHotels = filteredHotels.filter(hotel => {
        // room1 또는 room2의 maxCapa가 선택된 인원수와 같거나 더 많은 경우
        return hotel.room1.some(room => room.maxCapa >= selectedCapacity) ||
               hotel.room2.some(room => room.maxCapa >= selectedCapacity);
      });
    }

    const hotelsWithAvgScoreAndMinPrice = filteredHotels.map(hotel => ({
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

    // 4. 정렬
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
      sortedHotels = hotelsWithAvgScoreAndMinPrice;
    }
    return sortedHotels;
  };
    
  const filterSortList = getFilterChange();
  
  // filterSortList에서 minRoomPrice와 maxRoomPrice 구하기
  const filteredPrices = filterSortList.map(hotel => hotel.minRoomPrice);
  const dynamicMinPrice = filteredPrices.length > 0 ? Math.min(...filteredPrices) : minRoomPrice;
  const dynamicMaxPrice = filteredPrices.length > 0 ? Math.max(...filteredPrices) : maxRoomPrice;

  useEffect(() => {
    setMinPrice(dynamicMinPrice);
    setMaxPrice(dynamicMaxPrice);
    setPrice(dynamicMaxPrice);
  }, [dynamicMinPrice, dynamicMaxPrice]);

  useEffect(() => {
    setHotelData(getFilterChange());
  }, [hotels, currentSort, searchParams]);

  // 1박당 요금 슬라이더
  const handlePrice = () => {
    // 검색/정렬된 결과(filterSortList)에서 슬라이더 조건으로 필터링
    const filtered = filterSortList.filter(
      hotel => hotel.minRoomPrice <= price
    );
    setHotelData(filtered);
  };
   useEffect(() => {
       window.scrollTo({
           top: 0,
           behavior: "smooth", // 부드러운 스크롤 효과를 원하면 'smooth'
       });
   }, []); 

  // 이게 없으니까 슬라이더 값 설정 후 필터 적용이 안 됨
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
    
    // hotelData가 바뀔 때마다(검색 할 때) 최대값을 다시 계산해서 슬라이더에 반영
    useEffect(() => {
      if (hotelData.length > 0) {
        const prices = hotelData.map(hotel => hotel.minRoomPrice);
        const newMaxPrice = Math.max(...prices);
        setMaxPrice(newMaxPrice);
        // 슬라이더 값(price)이 최대값보다 크면 최대값으로 맞춤
        if (price > newMaxPrice) setPrice(newMaxPrice);
      }
    }, [hotelData]);

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
              min={minPrice}
              max={maxRoomPrice}
              value={price}
              onChange={handleChangePrice}
              className='priceRangeFilter'
            />
          </div>
          <div className='rangeResult'>
            <input 
              type='text'
              value={`₩${minPrice.toLocaleString()}`}
              onChange={handleChangeMinPriceInput}
              className='priceRangeFilterInput'
            />
            <input 
              type='text'
              value={`₩${price.toLocaleString()}`}
              onChange={handleChangePriceInput}
              className='priceRangeFilterInput'
            />
            <button onClick={handlePrice}>검색</button>
          </div>
        </div>
      </div>
      <div className='bottom'>
        <p className='total'>총 {hotelData.length}건</p>
        <div>
          {hotelData.map(hotel => <ListItem key={hotel.hotelId} hotel={hotel} />)}
        </div>
      </div>
    </div>
  );
}