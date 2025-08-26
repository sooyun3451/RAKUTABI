import React, { useEffect, useState } from 'react';
import '../css/my_page.css';
import axios from 'axios';
import MyPage from '../components/MyPage';

export default function CheckMyPage() {
  const [user, setUser] = useState({});
  
  const fetchData = async () => {
    const response = await axios.get('/data/user.json');
    setUser(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <MyPage isCheck={true} user={user} />
    </>
  );
}
