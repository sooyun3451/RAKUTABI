import React from 'react';

export default function AdminHotel() {
const dummyHotels = [
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
    availableRooms: 0, // 객실 판매 완료 상태
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
]; 

return (
    <div className='admin-member-list3'>
      <div className='admin-bed-txt'>숙소 전체 목록</div>
      <table className='admin-bed-table'>
        <thead>
          <tr>
            <th scope='col'>지역</th>
            <th scope='col'>호텔이름</th>
            <th scope='col'>1박당 가격</th>
            <th scope='col'>객실당 숙박인원수</th>
            <th scope='col'>잔여객실</th>
          </tr>
        </thead>
        <tbody>
          {dummyHotels.map((hotel) => (
            <tr key={hotel.id}>
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
            </tr>
          ))}
        </tbody>
      </table>
      <button className='admin-bed-all'>숙소 전체보기</button>
    </div>
  );
}
