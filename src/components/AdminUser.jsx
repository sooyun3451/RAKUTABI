import React from 'react';

export default function AdminUser() {
  const dummyUsers = [
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
];
  return (
    <div className='admin-member-list2'>
      <div className='admin-list-txt'>회원 전체 목록</div>
      <table className='admin-table'>
        <thead>
          <tr>
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
          {dummyUsers.map((user) => (
          <tr>
            <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.nickname}</td>
              <td>{user.auth}</td>
              <td>{user.point.toLocaleString()}</td>
              <td>{user.receive}</td>
              <td>{user.public}</td>
              <td>{user.cert}</td>
              <td>{user.block}</td>
              <td>{user.group}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <button className='admin-member-all'>회원 전체보기</button>
    </div>
  );
}