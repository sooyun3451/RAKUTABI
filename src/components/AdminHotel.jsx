import React, { useState } from 'react';

export default function AdminHotel() {
  const [dummyHotels, setDummyHotels] = useState([
    {
      id: 1,
      region: '오키나와',
      name: '오키나와 비치 호텔',
      price: 350000,
      maxCapacity: 4,
      availableRooms: 3,
    },
    {
      id: 2,
      region: '오키나와',
      name: '데이고 호텔',
      price: 420000,
      maxCapacity: 2,
      availableRooms: 1,
    },
    {
      id: 3,
      region: '도쿄',
      name: '도쿄 타워 호텔',
      price: 850000,
      maxCapacity: 3,
      availableRooms: 0,
    },
    {
      id: 4,
      region: '오사카',
      name: '오사카 캐슬 호텔',
      price: 320000,
      maxCapacity: 2,
      availableRooms: 5,
    },
    {
      id: 5,
      region: '삿포로',
      name: '삿포로 스노우 호텔',
      price: 380000,
      maxCapacity: 4,
      availableRooms: 1,
    },
    {
      id: 6,
      region: '후쿠오카',
      name: '파크 호텔 하카타',
      price: 210000,
      maxCapacity: 3,
      availableRooms: 7,
    },
  ]);

  const [selectedHotelIds, setSelectedHotelIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가

  const handleSelectHotel = (hotelId) => {
    setSelectedHotelIds((prevSelected) => {
      if (prevSelected.includes(hotelId)) {
        return prevSelected.filter((id) => id !== hotelId);
      } else {
        return [...prevSelected, hotelId];
      }
    });
  };

  const handleDeleteSelected = () => {
    setDummyHotels((prevHotels) =>
      prevHotels.filter((hotel) => !selectedHotelIds.includes(hotel.id))
    );
    setSelectedHotelIds([]);
  };

  const handleSearch = () => {
    setCurrentSearch(searchTerm);
  };

  const handleShowAllHotels = () => {
    setSearchTerm('');
    setCurrentSearch('');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (hotelId, field, value) => {
    setDummyHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === hotelId ? { ...hotel, [field]: value } : hotel
      )
    );
  };

  const filteredHotels = dummyHotels.filter((hotel) =>
    Object.values(hotel).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(currentSearch.toLowerCase())
    )
  );

  return (
    <div className='admin-member-list3'>
      <div className='admin-bed-txt'>숙소 전체 목록</div>
      <div className='admin-search-bar2'>
        <input
          type="text"
          placeholder='숙소 검색...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='admin-search-button2' onClick={handleSearch}>
          검색
        </button>
      </div>

      <table className='admin-bed-table'>
        <thead>
          <tr>
            <th scope='col'>선택</th>
            <th scope='col'>지역</th>
            <th scope='col'>호텔이름</th>
            <th scope='col'>1박당 가격</th>
            <th scope='col'>객실당 숙박인원수</th>
            <th scope='col'>잔여객실</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedHotelIds.includes(hotel.id)}
                  onChange={() => handleSelectHotel(hotel.id)}
                />
              </td>
              {isEditing ? (
                <>
                  <td>
                    <input
                      type='text'
                      value={hotel.region}
                      onChange={(e) => handleInputChange(hotel.id, 'region', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={hotel.name}
                      onChange={(e) => handleInputChange(hotel.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={hotel.price}
                      onChange={(e) => handleInputChange(hotel.id, 'price', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={hotel.maxCapacity}
                      onChange={(e) => handleInputChange(hotel.id, 'maxCapacity', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={hotel.availableRooms}
                      onChange={(e) => handleInputChange(hotel.id, 'availableRooms', Number(e.target.value))}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{hotel.region}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.price.toLocaleString('ko-KR')}원</td>
                  <td>{hotel.maxCapacity}명</td>
                  <td>
                    {hotel.availableRooms === 0 ? (
                      <span style={{ color: 'red', fontWeight: 'bold' }}>판매 완료</span>
                    ) : (
                      `${hotel.availableRooms}개`
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='button-list2'>
        <button className='admin-bed-button2' onClick={handleEditToggle}>
          {isEditing ? '저장' : '수정'}
        </button>
        {selectedHotelIds.length > 0 && (
          <button className='admin-bed-all2' onClick={handleDeleteSelected}>
            선택한 숙소 삭제
          </button>
        )}
        <button className='admin-bed-all2' onClick={handleShowAllHotels}>
          숙소 전체보기
        </button>
      </div>
    </div>
  );
}