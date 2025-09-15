import React, { useState } from 'react';

export default function AdminReview() {

  const [dummyReviews, setDummyReviews] = useState([
    {
      id: 1,
      region: '도쿄',
      restaurantName: '라멘 타츠노야',
      reviewScore: 4.0,
      reviewCount: 150,
      comment: '곱창 츠케멘 진짜 맛있어요. 조금 짜긴한데 마지막에 밥 말아 먹으면 환상입니다!',
    },
    {
      id: 2,
      region: '오사카',
      restaurantName: '야끼니쿠 키탄 호젠지',
      reviewScore: 4.0,
      reviewCount: 85,
      comment: '입에서 살살 녹는 야끼니쿠. 점심엔 정식 세트로 나오는데 고기 질이 정말 좋고 분위기도\n 고급스러워서 특별한 날에 오기 좋아요.',
    },
    {
      id: 3,
      region: '후쿠오카',
      restaurantName: '카사노야',
      reviewScore: 3.0,
      reviewCount: 210,
      comment: '다자이후 명물 우메가에 모찌! 갓 구워서 따끈하고 쫀득한 떡 안에 달콤한 팥소가 들어있어요.\n 길거리 간식으로 최고입니다.',
    },
    {
      id: 4,
      region: '삿포로',
      restaurantName: '징기스칸 다루마',
      reviewScore: 4.0,
      reviewCount: 300,
      comment: '삿포로에 왔다면 징기스칸은 필수! 양고기 냄새도 전혀 안 나고 정말 부드러워요.\n 특제 간장 소스에 찍어 먹으면 환상입니다.',
    },
    {
      id: 5,
      region: '오키나와',
      restaurantName: 'A&W 버거',
      reviewScore: 3.0,
      reviewCount: 95,
      comment: '오키나와에서만 맛볼 수 있는 특별한 햄버거 가게. 특유의 루트비어는 호불호가 갈릴 수 있지만 꼭 도전해보세요!\n 컬리 프라이도 맛있어요.',
    },
    {
      id: 6,
      region: '도쿄',
      restaurantName: '아후리',
      reviewScore: 4.0,
      reviewCount: 140,
      comment: '유자 츠케멘이 정말 특별한 맛이에요. 느끼하지 않고 상큼해서 끝까지 맛있게 먹을 수 있습니다.\n 고기도 두툼하고 너무 맛있어요!! 여성분들이 좋아할 맛!',
    },
  ]);

  const [selectedReviewIds, setSelectedReviewIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearch, setCurrentSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  
    const handleSelectUser = (userId) => {
      setSelectedUserIds((prevSelected) => {
        if (prevSelected.includes(userId)) {
          return prevSelected.filter((id) => id !== userId);
        } else {
          return [...prevSelected, userId];
        }
      });
    };

  const handleShowAllReviews = () => {
    setSearchTerm('');
    setCurrentSearch('');
  };

  const handleSearch = () => {
    setCurrentSearch(searchTerm);
  };

  const filteredReviews = dummyReviews.filter((review) =>
    Object.values(review).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(currentSearch.toLowerCase())
    )
  );

  const handleSelectReview = (reviewId) => {
    setSelectedReviewIds((prevSelected) => {
      if (prevSelected.includes(reviewId)) {
        return prevSelected.filter((id) => id !== reviewId);
      } else {
        return [...prevSelected, reviewId];
      }
    });
  };

  const handleDeleteSelected = () => {
    setDummyReviews((prevReivews) =>
      prevReivews.filter((review) => !selectedReviewIds.includes(review.id))
    );
    setSelectedReviewIds([]);
  };

  return (
    <div className='admin-member-list4'>
      <div className='admin-bed-txt'>식당 리뷰 목록</div>
      <div className='admin-search-bar'>
        <input 
          type="text" 
          placeholder='리뷰 검색...'  
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='admin-search-button2' onClick={handleSearch}>
          검색
        </button>
      </div>

      <table className='admin-bed-table2'>
        <thead>
          <tr>
            <th scope='col'>선택</th>
            <th scope='col'>지역</th>
            <th scope='col'>식당이름</th>
            <th scope='col'>식당평점</th>
            <th scope='col'>리뷰갯수</th>
            <th scope='col'>리뷰내용</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map((review) => (
            <tr key={review.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedReviewIds.includes(review.id)}
                  onChange={() => handleSelectReview(review.id)}
                />
              </td>
              <td>{review.region}</td>
              <td>{review.restaurantName}</td>
              <td>{review.reviewScore}점</td>
              <td>{review.reviewCount}개</td>
              <td>
                {review.comment.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
         <div className='button-list'>
      {selectedReviewIds.length > 0 && (
        <button className='admin-bed-all2' onClick={handleDeleteSelected}>
          선택한 리뷰 삭제
        </button>
      )}
        <button className='admin-bed-all2' onClick={handleShowAllReviews}>리뷰 전체보기</button>
      </div>
    </div>
  );
}