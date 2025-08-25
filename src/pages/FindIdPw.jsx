import React, { useEffect, useState } from 'react';
import '../css/find_id_pw.css'; 
import axios from 'axios';

export default function FindIdPw() {
  const [user, setUser] = useState({});

  const [nickName, setNiceName] = useState('');
  const [email,setEmail] = useState('');
  const [findIdResult, setFindIdResult] = useState('');

  const [id, setId] = useState('');
  const [pwEmail, setPwEmail] = useState('');
  const [findPwResult, setFindPwResult] = useState('');

  const handleChangeNickName = e => setNiceName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);
  const handleChangeId = e => setId(e.target.value);
  const handleChangePwEmail = e => setPwEmail(e.target.value);

  const fetchData = async () => {
    const response = await axios.get('/data/user.json');
    setUser(response.data);
  }

  useEffect(() => {
    fetchData();
  },[]);

  const handleFindId = () => {
    if(user.nickName === nickName && user.email === email) {
      setFindIdResult(user.id);
    }else {
      setFindIdResult('등록된 정보가 없습니다.');
    }
  }

  const handleFindPw = () => {
    if(user.id === id && user.email === pwEmail) {
      setFindPwResult(user.password);
    }else {
      setFindPwResult('등록된 정보가 없습니다.');
    }
  }

  return (
    <div className="find-wrapper">
      <p className="title">아이디 / 비밀번호 찾기</p>
      <div className="section">
        <p className="subtitle">아이디 찾기</p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickName}
          onChange={handleChangeNickName}
        />
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={handleChangeEmail}
        />
        <button className="find-button" onClick={handleFindId}>
          아이디 찾기
        </button>
        {findIdResult && <p className='result'>아이디: {findIdResult}</p>}
      </div>
      <div className="section">
        <p className="subtitle">비밀번호 찾기</p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={handleChangeId}
        />
        <input
          type="text"
          placeholder='이메일을 입력해주세요.'
          value={pwEmail}
          onChange={handleChangePwEmail}
        />
        <button className="find-button" onClick={handleFindPw}>
          비밀번호 찾기
        </button>
        {findPwResult && <p className='result'>비밀번호: {findPwResult}</p>}
      </div>
    </div>
  );
}
