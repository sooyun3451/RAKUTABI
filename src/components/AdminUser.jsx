import React, { useState } from 'react';

export default function AdminUser() {
  const [dummyUsers, setDummyUsers] = useState([
    {
      id: 'user01',
      name: '김민준',
      nickname: '민준님',
      auth: 10,
      point: 2500,
      receive: '예',
      public: '예',
      cert: '아니오',
      block: '아니오',
      group: '일반',
    },
    {
      id: 'user02',
      name: '이서연',
      nickname: '서연쓰',
      auth: 1,
      point: 100,
      receive: '예',
      public: '예',
      cert: '예',
      block: '아니오',
      group: '일반',
    },
    {
      id: 'user03',
      name: '박도현',
      nickname: '도현쓰',
      auth: 1,
      point: 50,
      receive: '아니오',
      public: '예',
      cert: '아니오',
      block: '아니오',
      group: '일반',
    },
    {
      id: 'user04',
      name: '최윤아',
      nickname: '윤아님',
      auth: 1,
      point: 800,
      receive: '예',
      public: '예',
      cert: '예',
      block: '아니오',
      group: '일반',
    },
    {
      id: 'user05',
      name: '정재민',
      nickname: '재민짱',
      auth: 1,
      point: 120,
      receive: '예',
      public: '아니오',
      cert: '예',
      block: '예',
      group: '차단',
    },
    {
      id: 'user06',
      name: '송지우',
      nickname: '지우지우',
      auth: 1,
      point: 300,
      receive: '아니오',
      public: '예',
      cert: '예',
      block: '아니오',
      group: '일반',
    },
    {
      id: 'user07',
      name: '오하준',
      nickname: '하준쓰',
      auth: 1,
      point: 0,
      receive: '예',
      public: '예',
      cert: '아니오',
      block: '예',
      group: '차단',
    },
    {
      id: 'user08',
      name: '김서영',
      nickname: '서영님',
      auth: 1,
      point: 450,
      receive: '예',
      public: '예',
      cert: '예',
      block: '아니오',
      group: '일반',
    },
  ]);

  const [selectedUserIds, setSelectedUserIds] = useState([]);
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

  const handleDeleteSelected = () => {
    setDummyUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedUserIds.includes(user.id))
    );
    setSelectedUserIds([]);
  };

  const handleSearch = () => {
    setCurrentSearch(searchTerm);
  };

  const handleShowAllUsers = () => {
    setSearchTerm('');
    setCurrentSearch('');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (userId, field, value) => {
    setDummyUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const filteredUsers = dummyUsers.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(currentSearch.toLowerCase())
    )
  );

  return (
    <div className='admin-member-list2'>
      <div className='admin-list-txt'>회원 전체 목록</div>
      <div className='admin-search-bar'>
        <input
          type='text'
          placeholder='회원 검색...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className='admin-search-button2' onClick={handleSearch}>
          검색
        </button>
      </div>
      <table className='admin-table'>
        <thead>
          <tr>
            <th scope='col'>선택</th>
            <th scope='col'>회원아이디</th>
            <th scope='col'>이름</th>
            <th scope='col'>닉네임</th>
            <th scope='col'>권한</th>
            <th scope='col'>포인트</th>
            <th scope='col'>수신</th>
            <th scope='col'>공개</th>
            <th scope='col'>인증</th>
            <th scope='col'>차단</th>
            <th scope='col'>그룹</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => handleSelectUser(user.id)}
                />
              </td>
              <td>{user.id}</td>
              {isEditing ? (
                <>
                  <td>
                    <input
                      type='text'
                      value={user.name}
                      onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.nickname}
                      onChange={(e) => handleInputChange(user.id, 'nickname', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={user.auth}
                      onChange={(e) => handleInputChange(user.id, 'auth', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      value={user.point}
                      onChange={(e) => handleInputChange(user.id, 'point', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.receive}
                      onChange={(e) => handleInputChange(user.id, 'receive', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.public}
                      onChange={(e) => handleInputChange(user.id, 'public', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.cert}
                      onChange={(e) => handleInputChange(user.id, 'cert', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.block}
                      onChange={(e) => handleInputChange(user.id, 'block', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type='text'
                      value={user.group}
                      onChange={(e) => handleInputChange(user.id, 'group', e.target.value)}
                    />
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.nickname}</td>
                  <td>{user.auth}</td>
                  <td>{user.point.toLocaleString()}</td>
                  <td>{user.receive}</td>
                  <td>{user.public}</td>
                  <td>{user.cert}</td>
                  <td>{user.block}</td>
                  <td>{user.group}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='button-list'>
         <button className='admin-search-button2-1' onClick={handleEditToggle}>
          {isEditing ? '저장' : '수정'}
        </button>
        {selectedUserIds.length > 0 && (
          <button className='admin-bed-all2' onClick={handleDeleteSelected}>
            선택한 회원 삭제
          </button>
        )}
        <button className='admin-bed-all2' onClick={handleShowAllUsers}>
          회원 전체보기
        </button>
      </div>
    </div>
  );
}